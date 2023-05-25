import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchClasses {
  @Field(() => String)
  class_id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content_summary: string;

  @Field(() => Int)
  price: number;

  @Field(() => String)
  total_time: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  address_detail: string;

  @Field(() => String)
  category: string;

  @Field(() => Int)
  is_ad: number;

  @Field(() => String)
  url: string;
}
