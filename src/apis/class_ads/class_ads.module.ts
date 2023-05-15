import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class_Ad } from './entities/class_ad.entity';
import { ClassAdsResolver } from './class_ads.resolver';
import { Class_AdsService } from './class_ads.service';
import { IamPortService } from '../iamport/iamport.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Class_Ad, //
    ]),
  ],
  providers: [
    ClassAdsResolver, //
    Class_AdsService,
    IamPortService,
  ],
})
export class ClassAdsModule {}
