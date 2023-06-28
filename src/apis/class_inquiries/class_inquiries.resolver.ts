import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ClassInquiriesService } from './class_inquiries.service';
import { CreateClassInquiryInput } from './dto/create-classInquiry.input';
import { FetchClassInquiries } from './dto/fetch-classInquiry.output';
import { UpdateClassInquiryInput } from './dto/update-classInquiry.input';

@Resolver()
export class ClassInquiriesResolver {
  constructor(
    private readonly classInquiriesService: ClassInquiriesService, //
  ) {}

  @Query(() => [FetchClassInquiries])
  fetchClassInquiries(
    @Args('class_id') class_id: string, //
    @Args({ name: 'page', type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
  ): Promise<FetchClassInquiries[]> {
    return this.classInquiriesService.findAllById({ class_id, page });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createClassInquiry(
    @Context() context: IContext,
    @Args('createClassInquiryInput')
    createClassInquiryInput: CreateClassInquiryInput,
  ): Promise<string> {
    return this.classInquiriesService.create({
      user_id: context.req.user.user_id,
      createClassInquiryInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  updateClassInquiry(
    @Args('updateClassInquiryInput')
    updateClassInquiryInput: UpdateClassInquiryInput, //
  ): Promise<boolean> {
    return this.classInquiriesService.update({ updateClassInquiryInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteClassInquiry(
    @Args('ci_id')
    ci_id: string, //
  ): Promise<boolean> {
    return this.classInquiriesService.delete({ ci_id });
  }
}
