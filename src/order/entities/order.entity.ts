import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Consumer } from './../../consumer/entities/consumer.entity';
import { Product } from './../../product/entities/product.entity';

export type OrderDocument = Order & Document;

@ObjectType()
@Schema()
export class Order {

  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Consumer', required: true })
  consumerId: Consumer;

  @Field()
  @Prop({ required: true })
  quantity: number;

  @Field()
  @Prop({ required: true })
  totalCost: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order)