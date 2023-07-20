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
      where: { class_: { class_id: class_ } },
      relations: ['class_'],
    });

    // const results = await this.imagesRepository.find({
    //   relations: ['class_'],
    // });
    return results;
  }

  async findAllBoardId({ board_ }): Promise<Image[]> {
    const results = await this.imagesRepository.find({
      where: { board_: { board_id: board_ } },
      relations: ['board_'],
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

  async update({ imageInput, class_, board_, magazine_ }): Promise<void> {
    let imageAllIdResults;
    if (class_ != 'null') {
      imageAllIdResults = await this.findAllClassId({
        class_,
      });
    } else if (board_ != 'null') {
      imageAllIdResults = await this.findAllBoardId({
        board_,
      });
    }

    for (let i = 0; i < imageAllIdResults.length; i++) {
      this.imagesRepository.delete({ image_id: imageAllIdResults[i].image_id });
    }

    await this.bulkInsert({ imageInput, class_, board_, magazine_ });
  }
}
