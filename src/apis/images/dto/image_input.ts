import { InputType, OmitType } from '@nestjs/graphql';
import { Image } from '../entities/image.entity';

@InputType()
export class ImageInput extends OmitType(
  Image,
  ['image_id', 'class_', 'board_', 'magazine_'],
  InputType,
) {}
