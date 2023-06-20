import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/create-board.input';
import { FetchBoards } from './dto/fetch-classes.output';
import { UpdateBoardInput } from './dto/update-board.input';
import { Board } from './entities/board.entity';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createBoard(
    @Context() context: IContext,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ): Promise<string> {
    return this.boardsService.create({
      createBoardInput,
      user_id: context.req.user.user_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [FetchBoards])
  fetchBoardsOfMine(
    @Context() context: IContext, //
  ): Promise<FetchBoards[]> {
    return this.boardsService.findAllByUserId({
      user_id: context.req.user.user_id,
    });
  }

  @Mutation(() => String)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput, //
  ): Promise<string> {
    return this.boardsService.update({ updateBoardInput });
  }

  @Mutation(() => Boolean)
  deleteBoard(
    @Args('board_id') board_id: string, //
  ): Promise<boolean> {
    return this.boardsService.delete({ board_id });
  }

  @Query(() => [FetchBoards])
  fetchBoards(
    @Args({ name: 'page', type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
  ): Promise<FetchBoards[]> {
    return this.boardsService.findAll({ page });
  }

  @Query(() => Board)
  fetchBoardDetail(
    @Args('board_id') board_id: string, //
  ): Promise<Board> {
    return this.boardsService.findOneById({ board_id });
  }
}
