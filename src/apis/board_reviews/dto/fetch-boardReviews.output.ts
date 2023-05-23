import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchBoardReviews {
  @Field(() => String)
  br_id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  grade: number;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
