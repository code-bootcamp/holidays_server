import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClassesService } from '../classes/classes.service';
import { IamPortService } from '../iamport/iamport.service';

import { ClASSAD_STATUS_ENUM, Class_Ad } from './entities/class_ad.entity';

import {
  IClassAdServiceCancel,
  IClassAdServiceCheckAlreadyCanceled,
  IClassAdServiceCheckDuplication,
  IClassAdServiceCheckClassAdInfo,
  IClassAdServiceCreate,
  IClassAdServiceCreateForPayment,
  IClassAdServiceFindOneByImpUid,
  IClassAdServiceFindOneByImpUidAndCancel,
} from './interfaces/classAds-service.interface';

@Injectable()
export class Class_AdsService {
  constructor(
    @InjectRepository(Class_Ad)
    private readonly classAdRepository: Repository<Class_Ad>, //

    private readonly classesService: ClassesService,

    private readonly iamPortService: IamPortService,

    private readonly dataSource: DataSource,
  ) {}

  findOneByImpUid({
    imp_uid,
  }: IClassAdServiceFindOneByImpUid): Promise<Class_Ad> {
    return this.classAdRepository.findOne({
      where: { imp_uid },
    });
  }

  async checkDuplication({
    imp_uid,
  }: IClassAdServiceCheckDuplication): Promise<void> {
    const isAd = await this.findOneByImpUid({ imp_uid });

    if (isAd) throw new ConflictException('이미 결제 완료되었습니다다!!');
  }

  async create({
    createClassAdInput,
    status = ClASSAD_STATUS_ENUM.PAYMENT,
  }: IClassAdServiceCreate): Promise<Class_Ad> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const classAd = this.classAdRepository.create({
        ...createClassAdInput,
        status,
      });

      await queryRunner.manager.save(classAd);

      const class_id = classAd.class_;
      await this.classesService.updateIsAd(class_id);

      await queryRunner.commitTransaction();

      return classAd;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createForPayment({
    createClassAdInput,
  }: IClassAdServiceCreateForPayment): Promise<Class_Ad> {
    const { imp_uid, amount } = createClassAdInput;
    await this.iamPortService.checkPaid({ imp_uid, amount });
    await this.checkDuplication({ imp_uid });

    return await this.create({ createClassAdInput });
  }

  findByImpUid({
    imp_uid,
  }: IClassAdServiceFindOneByImpUidAndCancel): Promise<Class_Ad[]> {
    return this.classAdRepository.find({
      where: {
        imp_uid,
      },
    });
  }

  checkAlreadyCanceled({ classAd }: IClassAdServiceCheckAlreadyCanceled): void {
    const isAd = classAd.filter(
      (el) => el.status === ClASSAD_STATUS_ENUM.CANCEL,
    );
    if (isAd.length) throw new ConflictException('이미 취소된 결제 입니다!!');
  }

  checkAdInfo({ classAd, method }: IClassAdServiceCheckClassAdInfo): void {
    const isAd = classAd.filter(
      (el) => el.status === ClASSAD_STATUS_ENUM.PAYMENT,
    );
    console.log(isAd);
    console.log(isAd.length);
    if (!isAd.length)
      throw new UnprocessableEntityException('결제 기록이 존재하지 않습니다.');

    if (isAd[0].method !== method)
      throw new UnprocessableEntityException('결제 수단이 틀립니다.');
  }

  async cancel({
    createClassAdInput,
  }: IClassAdServiceCancel): Promise<Class_Ad> {
    const { imp_uid, method } = createClassAdInput;
    const classAd = await this.findByImpUid({ imp_uid });
    this.checkAlreadyCanceled({ classAd });
    this.checkAdInfo({ classAd, method });

    const amount = await this.iamPortService.cancel({
      imp_uid,
    });

    createClassAdInput.amount = -amount;

    return this.create({
      createClassAdInput,
      status: ClASSAD_STATUS_ENUM.CANCEL,
    });
  }
}
