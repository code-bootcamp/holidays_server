import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>, //
  ) {}

  findOneByUserId({ user_id }): Promise<Wishlist[]> {
    return this.wishlistsRepository.find({ where: { user_: user_id } });
  }

  create({ user_id, class_id }) {
    return '찜하기 성공!';
  }

  async delete({ wishlist_id }): Promise<boolean> {
    const result = await this.wishlistsRepository.delete({ wishlist_id });

    return result.affected ? true : false;
  }
}
