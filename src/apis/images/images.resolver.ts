import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';

import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ImageInput } from './dto/image_input';
import { ImagesService } from './images.service';

@Resolver()
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => [String])
  createImage(
    @Args({ name: 'imageInput', type: () => [ImageInput] })
    imageInput: ImageInput[],
    @Args({ name: 'class_', type: () => String })
    class_: string,
    @Args({ name: 'board_', type: () => String })
    board_: string,
    @Args({ name: 'magazine_', type: () => String })
    magazine_: string,
    @Context() context: IContext,
  ): Promise<string[]> {
    // const user = context.req.user;

    return this.imagesService.bulkInsert({
      imageInput,
      class_,
      board_,
      magazine_,
    });
  }
}
