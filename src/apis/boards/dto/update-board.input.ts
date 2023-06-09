import { Field, InputType } from '@nestjs/graphql';
import { ImageInput } from 'src/apis/images/dto/image_input';

@InputType()
export class UpdateBoardInput {
  @Field(() => String)
  board_id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  birth_date: string;

  @Field(() => [ImageInput], { nullable: true })
  imageInput: ImageInput[];
}
