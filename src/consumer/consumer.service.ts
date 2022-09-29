import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsumerInput } from './dto/create-consumer.input';
import { UpdateConsumerInput } from './dto/update-consumer.input';
import { Consumer, ConsumerDocument } from './entities/consumer.entity';

@Injectable()
export class ConsumerService {

  constructor(
    @InjectModel(Consumer.name)
    public consumerModel: Model<ConsumerDocument>
  ) { }

  async create(createConsumerInput: CreateConsumerInput) {
    return await this.consumerModel.create(createConsumerInput);
  }

  async findAll() {
    return await this.consumerModel.find().exec();
  }

  async findOne(id: string) {
    return await this.consumerModel.findById(id).exec()
  }

  async update(id: string, updateConsumerInput: UpdateConsumerInput) {
    delete updateConsumerInput.id;
    return await this.consumerModel.findOneAndUpdate({ id }, { ...updateConsumerInput })
  }

  async remove(id: string) {
    return await this.consumerModel.findOneAndDelete({ id })
  }
}
