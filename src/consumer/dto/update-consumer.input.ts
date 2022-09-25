import { CreateConsumerInput } from './create-consumer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateConsumerInput extends PartialType(CreateConsumerInput) {
  @Field(() => String)
  id: string;
}
