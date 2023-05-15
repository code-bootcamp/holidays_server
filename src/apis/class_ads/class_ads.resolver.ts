import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { Class_AdsService } from './class_ads.service';
import { CreateClassAdInput } from './dto/class_ad.input';
import { Class_Ad } from './entities/class_ad.entity';

@Resolver()
export class ClassAdsResolver {
  constructor(private readonly classAdsService: Class_AdsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Class_Ad)
  createClassAd(
    @Args('createClassAdInput') createClassAdInput: CreateClassAdInput,
  ): Promise<Class_Ad> {
    return this.classAdsService.createForPayment({
      createClassAdInput,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Class_Ad)
  cancelClassAd(
    @Args('createClassAdInput') createClassAdInput: CreateClassAdInput,
  ): Promise<Class_Ad> {
    return this.classAdsService.cancel({
      createClassAdInput,
    });
  }
}
