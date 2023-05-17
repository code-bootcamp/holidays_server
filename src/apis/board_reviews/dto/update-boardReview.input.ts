import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardReviewInput {
  @Field(() => String)
  br_id: string;

  @Field(() => String)
  content: string;
}
