import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name:string;

  @Field(() => Int)
  price: number

  @Field(() => Int)
  quantity: number;
}
