import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardReviewInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  board_id: string;
}
