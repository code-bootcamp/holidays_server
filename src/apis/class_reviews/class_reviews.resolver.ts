import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ClassReviewsService } from './class_reviews.service';
import { CreateClassReviewInput } from './dto/create-classReview.input';
import { UpdateClassReviewInput } from './dto/update-classReview.input';
import { ClassReview } from './entities/class_review.entity';

@Resolver()
export class ClassReviewsResolver {
  constructor(
    private readonly classReviewsService: ClassReviewsService, //
  ) {}

  @Query(() => [ClassReview])
  fetchClassReviews(
    @Args('class_id') class_id: string, //
  ): Promise<ClassReview[]> {
    return this.classReviewsService.findAllById({ class_id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createClassReview(
    @Context() context: IContext,
    @Args('createClassReviewInput')
    createClassReviewInput: CreateClassReviewInput,
  ): Promise<string> {
    return this.classReviewsService.create({
      user_id: context.req.user.user_id,
      createClassReviewInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  updateClassReview(
    @Args('updateClassReviewInput')
    updateClassReviewInput: UpdateClassReviewInput, //
  ): Promise<boolean> {
    return this.classReviewsService.update({ updateClassReviewInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteClassReview(
    @Args('cr_id')
    cr_id: string, //
  ): Promise<boolean> {
    return this.classReviewsService.delete({ cr_id });
  }
}
