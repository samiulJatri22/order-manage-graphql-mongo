import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from './entities/order.entity';
import {MongooseModule} from '@nestjs/mongoose'
import { ConsumerModule } from 'src/consumer/consumer.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports:[MongooseModule.forFeature([{name: Order.name , schema: OrderSchema }]), ConsumerModule, ProductModule],
  providers: [OrderResolver, OrderService]
})
export class OrderModule {}
