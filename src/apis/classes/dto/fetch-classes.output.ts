import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { OutputTypeFactory } from '@nestjs/graphql/dist/schema-builder/factories/output-type.factory';
import { CreateClassScheduleInput } from 'src/apis/class_schedules/dto/create-class_schedule.input';
import { ImageInput } from 'src/apis/images/dto/image_input';

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
  url: string;
}
