import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchReservationsOfUser {
  @Field(() => String)
  res_id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  personnel: string;

  @Field(() => String)
  class_id: string;

  @Field(() => String)
  url: string;
}
