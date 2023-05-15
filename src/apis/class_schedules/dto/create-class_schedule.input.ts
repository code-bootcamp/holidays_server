import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassScheduleInput {
  @Field(() => String)
  class_id: string;

  @Field(() => String)
  date: string;

  @Field(() => Int)
  remain: number;
}
