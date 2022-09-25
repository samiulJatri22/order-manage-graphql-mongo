import { Injectable } from '@nestjs/common';
import { CreateConsumerInput } from './dto/create-consumer.input';
import { UpdateConsumerInput } from './dto/update-consumer.input';
import {InjectModel} from '@nestjs/mongoose'
import { Consumer, ConsumerDocument } from './entities/consumer.entity';
import {Model} from 'mongoose'

@Injectable()
export class ConsumerService {
  
  constructor(
    @InjectModel(Consumer.name)
    private consumerModel: Model<ConsumerDocument>
  ){}

  async create(createConsumerInput: CreateConsumerInput) {
    return await new this.consumerModel(createConsumerInput).save();
  }

  async findAll() {
    return await this.consumerModel.find().exec(); 
  }

  async findOne(id: string) {
    return await this.consumerModel.findOne({id}).exec()
  }

  async update(id: string, updateConsumerInput: UpdateConsumerInput) {
    delete updateConsumerInput.id;
    await this.consumerModel.findOneAndUpdate({id},{...updateConsumerInput}).exec()
    return await this.consumerModel.findById(id);
  }

  async remove(id: string) {
    return await this.consumerModel.findOneAndDelete({id}).exec();
  }
}
