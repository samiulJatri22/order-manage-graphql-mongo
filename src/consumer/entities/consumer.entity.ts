import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConsumerDocument = Consumer & Document;

@ObjectType()
@Schema()
export class Consumer {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field()
  @Prop({ default: 0, required: false })
  balance: number;
}

export const ConsumerSchema = SchemaFactory.createForClass(Consumer)