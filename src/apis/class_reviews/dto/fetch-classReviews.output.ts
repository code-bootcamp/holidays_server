import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchClassReviews {
  @Field(() => String)
  cr_id: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  grade: number;

  @Field(() => String)
  content: string;
}
