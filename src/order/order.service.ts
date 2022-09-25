import { Injectable } from '@nestjs/common';
import { ConsumerService } from 'src/consumer/consumer.service';
import { ProductService } from 'src/product/product.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import { Order, OrderDocument } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,

    private consumerService: ConsumerService,
    private productService: ProductService,
  ){}

  async create(createOrderInput: CreateOrderInput) {
    try{
      const [consumer, product] = await Promise.all([this.consumerService.findOne(createOrderInput.consumerId), await this.productService.findOne(createOrderInput.productId) ])

      const totalOrderCost = product.price * createOrderInput.quantity;
      if(totalOrderCost > consumer.balance){
        return new Error('Your Balance need more money!')
      }

      const order = await new this.orderModel({...createOrderInput , totalCost: totalOrderCost }).save();
      await this.consumerService.update(consumer.id, { id:consumer.id, balance: consumer.balance - totalOrderCost})

      return order;
    }catch(e){
      throw e;
    }
  }

  async findAll() {
    return await this.orderModel.find().populate('productId').populate('consumerId').exec() 
  }

  async findOne(id: string) {
    return await this.orderModel.findOne({id}).populate('productId').populate('consumerId').exec()
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    delete updateOrderInput.id;
    const [consumer, product] = await Promise.all([this.consumerService.findOne(updateOrderInput.consumerId), await this.productService.findOne(updateOrderInput.productId) ])

    const totalOrderCost = product.price * updateOrderInput.quantity;
    if(totalOrderCost > consumer.balance){
      return new Error('Your Balance need more money!')
    }

    await this.orderModel.findOneAndUpdate({id},{...updateOrderInput,  totalCost: product.price * updateOrderInput.quantity}).exec()
    await this.consumerService.update(consumer.id, { id:consumer.id, balance: consumer.balance - totalOrderCost})

    return await this.orderModel.findById(id).populate('productId').populate('consumerId');
  }

  async remove(id: string) {
    return await this.orderModel.findOneAndDelete({id}).populate('productId').populate('consumerId').exec();
  }
}
