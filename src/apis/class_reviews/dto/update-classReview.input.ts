import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateClassReviewInput {
  @Field(() => String)
  cr_id: string;

  @Field(() => String)
  content: string;

  @Field(() => Float)
  grade: number;
}
