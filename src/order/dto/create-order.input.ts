import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(()=> String)
  productId: string;

  @Field(()=> String)
  consumerId: string;
  
  @Field(() => Int)
  quantity: number;

}
