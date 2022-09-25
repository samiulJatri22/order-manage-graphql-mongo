import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConsumerInput {
  @Field(() => String)
  email:string;

  @Field(() => Int)
  balance:number;
}
