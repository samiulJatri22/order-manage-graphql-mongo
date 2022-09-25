import { ObjectType, Field} from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import {ID} from '@nestjs/graphql'
import {Document} from 'mongoose'

export type ConsumerDocument = Consumer & Document;

@ObjectType()
@Schema()
export class Consumer {
  @Field(() => ID)
  id:string;

  @Field()
  @Prop({required: true})
  email:string;

  @Field()
  @Prop({default:0, required:false})
  balance:number;
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer)