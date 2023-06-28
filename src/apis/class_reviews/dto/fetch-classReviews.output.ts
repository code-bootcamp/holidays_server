import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchClassReviews {
  @Field(() => String)
  cr_id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  grade: number;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
