import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { BoardReviewsService } from './board_reviews.service';
import { CreateBoardReviewInput } from './dto/create-boardReview.input';
import { FetchBoardReviews } from './dto/fetch-boardReviews.output';
import { UpdateBoardReviewInput } from './dto/update-boardReview.input';
import { BoardReview } from './entities/board_review.entity';

@Resolver()
export class BoardReviewsResolver {
  constructor(
    private readonly boardReviewsService: BoardReviewsService, //
  ) {}

  @Query(() => [FetchBoardReviews])
  fetchBoardReviews(
    @Args('board_id') board_id: string, //
    @Args({ name: 'page', type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
  ): Promise<FetchBoardReviews[]> {
    return this.boardReviewsService.findAllById({ board_id, page });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createBoardReview(
    @Context() context: IContext,
    @Args('createBoardReviewInput')
    createBoardReviewInput: CreateBoardReviewInput,
  ): Promise<string> {
    return this.boardReviewsService.create({
      user_id: context.req.user.user_id,
      createBoardReviewInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardReview)
  updateBoardReview(
    @Args('updateBoardReviewInput')
    updateBoardReviewInput: UpdateBoardReviewInput, //
  ) {
    return this.boardReviewsService.update({ updateBoardReviewInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteBoardReview(
    @Args('br_id')
    br_id: string, //
  ): Promise<boolean> {
    return this.boardReviewsService.delete({ br_id });
  }
}
