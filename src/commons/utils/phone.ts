import { UnprocessableEntityException } from '@nestjs/common';

export function checkPhone({ phone }) {
  if (phone.length < 10 || phone.length > 11) {
    throw new UnprocessableEntityException('형식이 올바르지 않습니다!');
  } else {
    return true;
  }
}
