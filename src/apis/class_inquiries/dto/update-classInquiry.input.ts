import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateClassInquiryInput {
  @Field(() => String)
  ci_id: string;

  @Field(() => String)
  content: string;
}
