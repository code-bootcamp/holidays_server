import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FetchBoards {
  @Field(() => String)
  board_id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  url: string;
}
