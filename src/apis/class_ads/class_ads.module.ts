import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class_Ad } from './entities/class_ad.entity';
import { ClassAdsResolver } from './class_ads.resolver';
import { Class_AdsService } from './class_ads.service';
import { IamPortService } from '../iamport/iamport.service';
import { ClassesService } from '../classes/classes.service';
import { Class } from '../classes/entities/class.entity';
import { ImagesService } from '../images/images.service';
import { ClassSchedulesService } from '../class_schedules/class_schedules.service';
import { ClassSchedule } from '../class_schedules/entities/class_schedule.entity';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class_Ad, //
      Class,
      Image,
      ClassSchedule,
    ]),
  ],
  providers: [
    ClassAdsResolver, //
    Class_AdsService,
    ClassesService,
    IamPortService,
    ImagesService,
    ClassSchedulesService,
  ],
})
export class ClassAdsModule {}
