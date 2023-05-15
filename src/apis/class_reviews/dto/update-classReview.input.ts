import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateClassReviewInput {
  @Field(() => String)
  cr_id: string;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  grade: number;
}
