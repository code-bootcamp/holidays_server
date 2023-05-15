import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsResolver } from './wishlists.resolver';
import { WishlistsService } from './wishlists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wishlist, //
    ]),
  ],

  providers: [
    WishlistsResolver, //
    WishlistsService,
  ],
})
export class WishlistsModule {}
