import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassReviewInput {
  @Field(() => String)
  content: string;

  @Field(() => Float)
  grade: number;

  @Field(() => String)
  class_id: string;
}
