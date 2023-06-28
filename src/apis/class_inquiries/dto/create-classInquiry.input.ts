import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateClassInquiryInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  class_id: string;
}
