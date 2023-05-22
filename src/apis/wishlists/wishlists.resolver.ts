import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { FetchWishlists } from './dto/fetch-wishlists.output';
import { Wishlist } from './entities/wishlist.entity';
import { WishlistsService } from './wishlists.service';

@Resolver()
export class WishlistsResolver {
  constructor(
    private readonly wishlistsService: WishlistsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createWishlist(
    @Context() context: IContext,
    @Args('class_id') class_id: string,
  ): Promise<string> {
    return this.wishlistsService.create({
      user_id: context.req.user.user_id,
      class_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [FetchWishlists])
  fetchWishlists(
    @Context() context: IContext, //
  ): Promise<FetchWishlists[]> {
    return this.wishlistsService.findOneByUserId({
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteWishlist(
    @Context() context: IContext, //
    @Args('class_id') class_id: string,
  ) {
    return this.wishlistsService.delete({
      class_id,
      user_id: context.req.user.user_id,
    });
  }
}
