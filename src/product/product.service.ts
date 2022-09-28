import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product, ProductDocument } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>
  ) { }

  async create(createProductInput: CreateProductInput) {
    return await new this.productModel(createProductInput).save();
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id).exec()
  }

  async update(id: string, updateProductInput: UpdateProductInput) {
    delete updateProductInput.id;
    await this.productModel.findOneAndUpdate({ id }, { ...updateProductInput }).exec()
    return await this.productModel.findById(id);
  }

  async remove(id: string) {
    return await this.productModel.findOneAndDelete({ id }).exec();
  }
}
