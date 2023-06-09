import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(
    @Context() context: IContext, //
  ): Promise<User> {
    const user_id = context.req.user.user_id;
    return this.usersService.findOneById({ user_id });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ): Promise<User> {
    return this.usersService.create({ createUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUser(
    @Context() context: IContext,
    @Args('updateUserInput') updateUserInput: UpdateUserInput, //
  ): Promise<User> {
    return this.usersService.update({
      user_id: context.req.user.user_id,
      updateUserInput,
    });
  }

  @Query(() => User)
  fetchUserIdByPhone(@Args('phone') phone: string): Promise<User> {
    return this.usersService.findOneByPhone({ phone });
  }

  @Mutation(() => Boolean)
  updateUserPwd(
    @Args('email') email: string,
    @Args('pwd') pwd: string,
  ): Promise<boolean> {
    return this.usersService.updatePwd({ email, pwd });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteUser(
    @Context() context: IContext, //, //
  ): Promise<boolean> {
    return this.usersService.delete({ user_id: context.req.user.user_id });
  }

  @Mutation(() => String)
  getTokenEmail(
    @Args('email') email: string, //
    @Args('method') method: string,
  ): Promise<string> {
    return this.usersService.sendTokenEmail({ email, method });
  }

  @Mutation(() => Boolean)
  checkEmailToken(
    @Args('email') email: string, //
    @Args('token') token: string,
  ): Promise<boolean> {
    return this.usersService.checkEmailToken({ email, token });
  }

  @Mutation(() => String)
  getTokenPhone(
    @Args('phone') phone: string, //
  ): Promise<string> {
    return this.usersService.sendTokenPhone({ phone });
  }

  @Mutation(() => Boolean)
  checkPhoneToken(
    @Args('phone') phone: string, //
    @Args('token') token: string,
  ): Promise<boolean> {
    return this.usersService.checkPhoneToken({ phone, token });
  }
}
