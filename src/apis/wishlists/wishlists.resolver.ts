import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsService } from './wishlists.service';

@Resolver()
export class WishlistsResolver {
  constructor(
    private readonly wishlistsService: WishlistsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Wishlist)
  createWishlist(
    @Context() context: IContext,
    @Args('class_id') class_id: string,
  ) {
    return this.wishlistsService.create({
      user_id: context.req.user.user_id,
      class_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  fetchWishlists(
    @Context() context: IContext, //
  ) {
    return this.wishlistsService.findOneByUserId({
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteWishlist(@Args('wishlist_id') wishlist_id: string) {
    return this.wishlistsService.delete({
      wishlist_id,
    });
  }
}
