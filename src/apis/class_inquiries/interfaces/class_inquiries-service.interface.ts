import { CreateClassInquiryInput } from '../dto/create-classInquiry.input';
import { UpdateClassInquiryInput } from '../dto/update-classInquiry.input';

export interface IClassInquiriesServiceCreate {
  user_id: string;
  createClassInquiryInput: CreateClassInquiryInput;
}

export interface IClassInquiriesServiceUpdate {
  updateClassInquiryInput: UpdateClassInquiryInput;
}

export interface IClassInquiriesServiceFindAllById {
  class_id: string;
  page: number;
}

export interface IClassesServiceSendClassInquiry {
  user_id: string;
  class_id: string;
  content: string;
}
