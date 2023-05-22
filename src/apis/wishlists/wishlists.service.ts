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
      .innerJoin('class', 'c', 'c.class_id = wishlist.class_classId')
      .innerJoin('image', 'i', 'c.class_id = i.class_classId')
      .where('1=1')
      .andWhere('wishlist.user_userId = :user_id', { user_id })
      .andWhere('i.is_main = 1')
      .getRawMany();

    return result;
  }

  async create({
    user_id,
    class_id,
  }: IWishlistsServiceCreate): Promise<string> {
    const result = await this.wishlistsRepository.save({
      user_: { user_id },
      class_: { class_id },
    });

    return result.wishlist_id;
  }

  async delete({
    class_id,
    user_id,
  }: IWishlistsServiceDelete): Promise<boolean> {
    const result = await this.wishlistsRepository
      .createQueryBuilder('wishlist')
      .delete()
      .where('user_userId = :user_id', { user_id })
      .andWhere('class_classId = :class_id', { class_id })
      .execute();

    return result.affected ? true : false;
  }
}
