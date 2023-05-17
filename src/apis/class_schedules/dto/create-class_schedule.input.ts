import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassScheduleInput {
  @Field(() => String)
  date: string;

  @Field(() => Int)
  remain: number;
}
