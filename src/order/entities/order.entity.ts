import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {ID} from '@nestjs/graphql'
import mongoose from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Consumer } from 'src/consumer/entities/consumer.entity';
import {Document} from 'mongoose'

export type OrderDocument = Order & Document;

@ObjectType()
@Schema()
export class Order {
 
  @Field(() => ID)
  id:string;

  @Field()
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Product' , required:true })
  productId: Product;

  @Field()
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Consumer' , required:true})
  consumerId: Consumer;
  
  @Field()
  @Prop({required:true})
  quantity: number;

  @Field()
  @Prop({required:true})
  totalCost: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order)