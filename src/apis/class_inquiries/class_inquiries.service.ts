import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchClassInquiries } from './dto/fetch-classInquiry.output';
import { ClassInquiry } from './entities/class_inquiry.entity';
import {
  IClassesServiceSendClassInquiry,
  IClassInquiriesServiceCreate,
  IClassInquiriesServiceFindAllById,
  IClassInquiriesServiceUpdate,
} from './interfaces/class_inquiries-service.interface';

import coolSms from 'coolsms-node-sdk';
import { UsersService } from '../users/users.service';

const messageService = new coolSms(process.env.SMS_KEY, process.env.SMS_SECRET);

@Injectable()
export class ClassInquiriesService {
  constructor(
    @InjectRepository(ClassInquiry)
    private readonly classInquiriesRepository: Repository<ClassInquiry>, //

    private readonly usersService: UsersService,
  ) {}

  findAllById({
    class_id,
    page,
  }: IClassInquiriesServiceFindAllById): Promise<FetchClassInquiries[]> {
    const pageSize = 5;

    const result = this.classInquiriesRepository
      .createQueryBuilder('class_inquiry')
      .select([
        'u.name AS name',
        'class_inquiry.ci_id AS ci_id',
        'class_inquiry.content AS content',
        'class_inquiry.createdAt AS createdAt',
      ])
      .innerJoin('user', 'u', 'u.user_id = class_inquiry.user_userId')
      .where('class_inquiry.class_classId = :class_id', { class_id })
      .orderBy('class_inquiry.createdAt', 'DESC')
      .limit(pageSize)
      .offset(pageSize * (page - 1))
      .getRawMany();

    return result;
  }

  async create({
    user_id,
    createClassInquiryInput,
  }: IClassInquiriesServiceCreate): Promise<string> {
    const { class_id, content } = createClassInquiryInput;

    const result = await this.classInquiriesRepository.save({
      class_: { class_id },
      user_: { user_id },
      ...createClassInquiryInput,
    });

    await this.sendClassInquiry({ user_id, class_id, content });

    return result.ci_id;
  }

  async sendClassInquiry({
    user_id,
    class_id,
    content,
  }: IClassesServiceSendClassInquiry): Promise<string> {
    const phone = await this.classInquiriesRepository
      .createQueryBuilder('class_inquiry')
      .select('u.phone')
      .innerJoin('user', 'u', 'class_inquiry.user_userId = u.user_id')
      .innerJoin('class', 'c', 'class_inquiry.class_classId = c.class_id')
      .where('1=1')
      .andWhere('class_inquiry.class_classId = :class_id', { class_id })
      .getRawOne();

    const user = await this.usersService.findOneById({ user_id });

    const result = await messageService.sendOne({
      to: phone.u_phone,
      from: process.env.SMS_SENDER,
      text: `${user.name}님에게 문의가 왔습니다
문의 내용: ${content} 
${user.name}님 연락처: ${user.phone}`,
      autoTypeDetect: true,
    });

    return '문의 전송 완료!';
  }

  async update({
    updateClassInquiryInput,
  }: IClassInquiriesServiceUpdate): Promise<boolean> {
    const ci_id = updateClassInquiryInput.ci_id;

    const result = await this.classInquiriesRepository.update(
      { ci_id },
      { ...updateClassInquiryInput },
    );

    return result.affected ? true : false;
  }

  async delete({ ci_id }): Promise<boolean> {
    const result = await this.classInquiriesRepository.delete({ ci_id });

    return result.affected ? true : false;
  }
}
