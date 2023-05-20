import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FetchWishlists } from './dto/fetch-wishlists.output';
import { Wishlist } from './entities/wishlist.entity';
import {
  IWishlistsServiceCreate,
  IWishlistsServiceDelete,
  IWishlistsServiceFindOneByUserId,
} from './interfaces/wishlists-service.interface';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistsRepository: Repository<Wishlist>, //
  ) {}

  async findOneByUserId({
    user_id,
  }: IWishlistsServiceFindOneByUserId): Promise<FetchWishlists[]> {
    const result = await this.wishlistsRepository
      .createQueryBuilder('wishlist')
      .select([
        'c.class_id AS class_id',
        'c.title AS title',
        'c.price AS price',
        'c.total_time AS total_time',
        'c.address AS address',
        'c.address_detail AS address_detail',
        'i.url AS url',
      ])
      .innerJoin('user', 'u', 'wishlist.user_userId = u.user_id')
      .innerJoin('class', 'c', 'wishlist.user_userId = c.user_userId')
      .innerJoin('image', 'i', 'c.class_id = i.class_classId')
      .where('1=1')
      .andWhere('u.user_id = :user_id', { user_id })
      .getRawMany();
    console.log(result);

    return result;
  }

  async create({
    user_id,
    class_id,
  }: IWishlistsServiceCreate): Promise<Wishlist> {
    const result = await this.wishlistsRepository.save({
      user_: { user_id },
      class_: { class_id },
    });

    return result;
  }

  async delete({ wishlist_id }: IWishlistsServiceDelete): Promise<boolean> {
    const result = await this.wishlistsRepository.delete({ wishlist_id });

    return result.affected ? true : false;
  }
}
