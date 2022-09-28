import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConsumerModule } from './../consumer/consumer.module';
import { ProductModule } from './../product/product.module';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]), ConsumerModule, ProductModule],
  providers: [OrderResolver, OrderService]
})
export class OrderModule { }
