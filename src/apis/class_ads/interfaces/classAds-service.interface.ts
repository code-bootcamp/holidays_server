import { CreateClassAdInput } from '../dto/class_ad.input';
import { ClASSAD_STATUS_ENUM, Class_Ad } from '../entities/class_ad.entity';

export interface IClassAdServiceFindOneByImpUid {
  imp_uid: string;
}
export interface IClassAdServiceFindOneByImpUidAndCancel {
  imp_uid: string;
}
export interface IClassAdServiceCheckDuplication {
  imp_uid: string;
}

export interface IClassAdServiceCreate {
  createClassAdInput: CreateClassAdInput;
  amount?: number;
  status?: ClASSAD_STATUS_ENUM;
}

export interface IClassAdServiceCreateForPayment {
  createClassAdInput: CreateClassAdInput;
}

export interface IClassAdServiceCheckAlreadyCanceled {
  classAd: Class_Ad[];
}

export interface IClassAdServiceCheckClassAdInfo {
  classAd: Class_Ad[];
  method: string;
}

export interface IClassAdServiceCancel {
  createClassAdInput: CreateClassAdInput;
}
