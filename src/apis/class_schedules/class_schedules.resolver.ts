import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ClassSchedulesService } from './class_schedules.service';
import { CreateClassScheduleInput } from './dto/create-class_schedule.input';
import { UpdateClassScheduleInput } from './dto/update-class_schedule.input';
import { ClassSchedule } from './entities/class_schedule.entity';

@Resolver()
export class ClassSchedulesResolver {
  constructor(
    private readonly classSchedulesService: ClassSchedulesService, //
  ) {}

  @Query(() => [ClassSchedule])
  fetchClassSchedules(
    @Args('class_id') class_id: string, //
  ): Promise<ClassSchedule[]> {
    return this.classSchedulesService.findAllByUser({
      class_id,
    });
  }

  @Mutation(() => String)
  createClassSchedule(
    @Args('createClassScheduleInput')
    createClassScheduleInput: CreateClassScheduleInput,
  ): Promise<string> {
    return this.classSchedulesService.create({
      createClassScheduleInput,
    });
  }

  @Mutation(() => Boolean)
  updateClassSchedule(
    @Args('updateClassScheduleInput')
    updateClassScheduleInput: UpdateClassScheduleInput, //
  ): Promise<boolean> {
    return this.classSchedulesService.update({ updateClassScheduleInput });
  }

  @Mutation(() => Boolean)
  deleteClassSchedule(
    @Args('cs_id') cs_id: string, //
  ): Promise<boolean> {
    return this.classSchedulesService.delete({ cs_id });
  }
}
