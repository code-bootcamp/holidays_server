import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassAdInput {
  @Field(() => String)
  imp_uid: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  method: string;

  @Field(() => String)
  class_id: string;
}
