import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ClassesService } from './classes.service';
import { CreateClassInput } from './dto/create-class.input';
import { UpdateClassInput } from './dto/update-class.input';
import { Class } from './entities/class.entity';

@Resolver()
export class ClassesResolver {
  constructor(
    private readonly classesService: ClassesService, //
  ) {}

  @Query(() => [Class])
  fetchClasses(
    @Args('category') category: string,
    @Args('address_category') address_category: string,
    @Args('search') search: string,
  ): Promise<Class[]> {
    return this.classesService.findAllByFilter({
      category,
      address_category,
      search,
    });
  }

  @Query(() => [Class])
  fetchClassesAd(
    @Args('category') category: string,
    @Args('address_category') address_category: string,
    @Args('search') search: string,
  ): Promise<Class[]> {
    return this.classesService.findAllByFilterWithAd({
      category,
      address_category,
      search,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Class)
  createClass(
    @Context() context: IContext,
    @Args('createClassInput') createClassInput: CreateClassInput,
  ) {
    return this.classesService.create({
      createClassInput,
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => Class)
  fetchClassDetail(@Args('class_id') class_id: string): Promise<Class> {
    return this.classesService.findOneById({
      class_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Class)
  updateClass(@Args('updateClassInput') updateClassInput: UpdateClassInput) {
    return this.classesService.update({
      updateClassInput,
    });
  }

  @Mutation(() => Boolean)
  deleteClass(
    @Args('class_id') class_id: string, //
  ): Promise<boolean> {
    return this.classesService.delete({ class_id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createClassInquiry(
    @Context() context: IContext,
    @Args('class_id') class_id: string,
    @Args('content') content: string,
  ): Promise<string> {
    return this.classesService.sendClassInquiry({
      user_id: context.req.user.user_id,
      class_id,
      content,
    });
  }
}
