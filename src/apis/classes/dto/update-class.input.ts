import { Field, InputType, Int } from '@nestjs/graphql';
import { CreateClassScheduleInput } from 'src/apis/class_schedules/dto/create-class_schedule.input';
import { UpdateClassScheduleInput } from 'src/apis/class_schedules/dto/update-class_schedule.input';
import { ImageInput } from 'src/apis/images/dto/image_input';

@InputType()
export class UpdateClassInput {
  @Field(() => String)
  class_id: string;

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
  address_category: string;

  @Field(() => String)
  total_time: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  accountNum: string;

  @Field(() => String)
  accountName: string;

  @Field(() => String)
  bankName: string;

  @Field(() => [UpdateClassScheduleInput])
  classSchedulesInput: UpdateClassScheduleInput[];

  @Field(() => [ImageInput])
  imageInput: ImageInput[];
}
