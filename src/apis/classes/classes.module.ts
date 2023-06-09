import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class_AdsService } from '../class_ads/class_ads.service';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ClassSchedule } from '../class_schedules/entities/class_schedule.entity';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ClassesResolver } from './classes.resolver';
import { ClassesService } from './classes.service';
import { Class } from './entities/class.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class, //
      ClassSchedule,
      Image,
      User,
    ]),
  ],

  providers: [
    ClassesResolver, //
    ClassesService,
    ImagesService,
    ClassSchedulesService,
    UsersService,
    // Class_AdsService,
  ],

  exports: [
    ClassesService, //
  ],
})
export class ClassesModule {}
