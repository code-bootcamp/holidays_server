import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateClassScheduleInput {
  @Field(() => String)
  cs_id: string;

  @Field(() => String)
  date: string;

  @Field(() => Int)
  remain: number;
}
