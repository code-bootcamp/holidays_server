import { CreateClassInput } from '../dto/create-class.input';
import { UpdateClassInput } from '../dto/update-class.input';

export interface IClassesServiceCreate {
  createClassInput: CreateClassInput;
  user_id: string;
}

export interface IClassesServiceFindAllByFilter {
  category?: string;
  address_category?: string;
  search?: string;
  page: number;
}

export interface IClassesServiceFindAllByFilterWithAd {
  category: string;
  address_category: string;
  search: string;
}

export interface IClassesServiceFindOneById {
  class_id: string;
}

export interface IClassesServiceUpdate {
  updateClassInput: UpdateClassInput;
}

export interface IClassesServiceDelete {
  class_id: string;
}

export interface IClassesServiceUpdateIsAd {
  class_id: string;
}

export interface IClassesServicePopular {
  title: string;
  content_summary: string;
  price: number;
  total_time: string;
  address: string;
  address_detail: string;
  row_count: number;
}

export interface IClassesServiceSendClassInquiry {
  user_id: string;
  class_id: string;
  content: string;
}
