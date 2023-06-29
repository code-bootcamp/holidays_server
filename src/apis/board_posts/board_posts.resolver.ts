import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { BoardPostsService } from './board_posts.service';
import { FetchBoardPosts } from './dto/fetch-boardPosts.output';

@Resolver()
export class BoardPostsResolver {
  constructor(
    private readonly boardPostsService: BoardPostsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  createBoardPost(
    @Context() context: IContext,
    @Args('board_id') board_id: string,
  ): Promise<boolean> {
    return this.boardPostsService.create({
      user_id: context.req.user.user_id,
      board_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [FetchBoardPosts])
  fetchBoardPosts(
    @Context() context: IContext, //
  ): Promise<FetchBoardPosts[]> {
    return this.boardPostsService.findAllByUserId({
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => String)
  fetchBoardPostOfMine(
    @Context() context: IContext, //
    @Args('board_id') board_id: string,
  ): Promise<string> {
    return this.boardPostsService.findOneByUserId({
      board_id,
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteBoardPost(
    @Context() context: IContext, //
    @Args('board_id') board_id: string,
  ) {
    return this.boardPostsService.delete({
      board_id,
      user_id: context.req.user.user_id,
    });
  }
}
