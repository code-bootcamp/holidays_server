import { Field, InputType, Int } from '@nestjs/graphql';
import { ImageInput } from 'src/apis/images/dto/image_input';

@InputType()
export class CreateClassInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content_summary: string;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  class_mNum: number;

  @Field(() => String)
  address: string;

  @Field(() => String)
  address_detail: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  total_time: string;

  @Field(() => String)
  content: string;

  @Field(() => [ImageInput], { nullable: true })
  imageInput: ImageInput[];
}
