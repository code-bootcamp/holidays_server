import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservationInput {
  @Field(() => String)
  class_id: string;

  @Field(() => String)
  res_date: string;

  @Field(() => Int)
  personnel: number;
}
