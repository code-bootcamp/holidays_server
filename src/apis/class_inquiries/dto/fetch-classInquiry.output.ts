import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchClassInquiries {
  @Field(() => String)
  ci_id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;
}
