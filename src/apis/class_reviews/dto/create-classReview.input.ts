import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateClassReviewInput {
  @Field(() => String)
  content: string;

  @Field(() => Int)
  grade: number;

  @Field(() => String)
  class_id: string;
}
