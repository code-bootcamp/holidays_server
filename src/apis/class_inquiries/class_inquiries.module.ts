import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ClassInquiriesResolver } from './class_inquiries.resolver';
import { ClassInquiriesService } from './class_inquiries.service';
import { ClassInquiry } from './entities/class_inquiry.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClassInquiry, //
      User,
    ]),
  ],

  providers: [
    ClassInquiriesResolver, //
    ClassInquiriesService,
    UsersService,
  ],
})
export class ClassInquiriesModule {}
