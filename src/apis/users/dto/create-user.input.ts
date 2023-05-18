import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  pwd: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  birth_date: string;
}
