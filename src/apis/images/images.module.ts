import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesResolver } from './images.resolver';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image, //
    ]),
  ],
  providers: [
    ImagesResolver, //
    ImagesService,
  ],
  // exports: [
  //   ImagesService, //
  // ],
})
export class ImagesModule {}
