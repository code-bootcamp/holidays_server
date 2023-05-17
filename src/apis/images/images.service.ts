import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>, //
  ) {}

  async findAllClassId({ class_ }): Promise<Image[]> {
    const results = await this.imagesRepository.find({
      where: { class_ },
    });
    return results;
  }

  async findAllBoardId({ board_ }): Promise<Image[]> {
    const results = await this.imagesRepository.find({
      where: { board_ },
    });
    return results;
  }

  async findAllMagazineId({ magazine_ }): Promise<Image[]> {
    const results = await this.imagesRepository.find({
      where: { magazine_ },
    });
    return results;
  }

  async bulkInsert({
    imageInput,
    class_,
    board_,
    magazine_,
  }): Promise<string[]> {
    const images = [];
    for (let i = 0; i < imageInput.length; i++) {
      class_ !== 'null'
        ? images.push({
            url: imageInput[i].url,
            is_main: imageInput[i].is_main,
            type: imageInput[i].type,
            class_,
          })
        : board_ !== 'null'
        ? images.push({
            url: imageInput[i].url,
            is_main: imageInput[i].is_main,
            type: imageInput[i].type,
            board_,
          })
        : images.push({
            url: imageInput[i].url,
            is_main: imageInput[i].is_main,
            type: imageInput[i].type,
            magazine_,
          });
    }
    const results = await this.imagesRepository.insert(images);

    const image_id = [];
    for (let i = 0; i < results.identifiers.length; i++) {
      image_id.push(results.identifiers[i].image_id);
    }
    return image_id;
  }

  async deleteAll({ image_ids }): Promise<void> {
    await this.imagesRepository.delete({ image_id: image_ids[0] });
  }

  async update({ imageInput, class_, board_, magazine_ }): Promise<void> {
    console.log('업데이트시작');
    const imageAllIdResults = await this.findAllClassId({
      class_,
    });

    const image_ids = [];
    for (let i = 0; i < imageAllIdResults.length; i++) {
      image_ids.push(imageAllIdResults[i].image_id);
    }

    await this.deleteAll({ image_ids });

    await this.bulkInsert({ imageInput, class_, board_, magazine_ });
  }
}
