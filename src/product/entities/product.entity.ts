import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose'
import {ID} from '@nestjs/graphql'
import {Document} from 'mongoose'

export type ProductDocument = Product & Document;

@ObjectType()
@Schema()
export class Product {

  @Field(() => ID)
  id:string;

  @Field()
  @Prop({nullable:true})
  name:string;

  @Field()
  @Prop({required:true})
  price: number

  @Field()
  @Prop({required:false, default:10})
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)
