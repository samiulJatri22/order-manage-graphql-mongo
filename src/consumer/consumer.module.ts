import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerResolver } from './consumer.resolver';
import {MongooseModule} from '@nestjs/mongoose'
import { Consumer, ConsumerSchema } from './entities/consumer.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: Consumer.name , schema: ConsumerSchema }])],
  providers: [ConsumerResolver, ConsumerService],
  exports:[ConsumerService]
})
export class ConsumerModule {}
