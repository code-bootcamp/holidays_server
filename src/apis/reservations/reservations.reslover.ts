import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateReservationInput } from './dto/create-reservation.input';
import { Reservation } from './entities/reservation.entity';
import { ReservationsService } from './reservations.service';

@Resolver()
export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService, //
  ) {}

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Reservation])
  fetchReservationsOfUser(
    @Context() context: IContext,
  ): Promise<Reservation[]> {
    return this.reservationsService.findAllByUser({
      user_id: context.req.user.user_id,
    });
  }

  @Query(() => [Reservation])
  fetchReservationsOfClass(
    @Args('class_id') class_id: string, //
  ): Promise<Reservation[]> {
    return this.reservationsService.findAllByClass({
      class_id,
    });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  createReservation(
    @Context() context: IContext,
    @Args('createReservationInput')
    createReservationInput: CreateReservationInput,
  ): Promise<string> {
    return this.reservationsService.create({
      user_id: context.req.user.user_id,
      createReservationInput,
    });
  }

  @Mutation(() => Boolean)
  updateReservation(
    @Args('rse_id') res_id: string, //
  ): Promise<boolean> {
    return this.reservationsService.updateStatus({ res_id });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteReservation(
    @Args('res_id') res_id: string, //
  ): Promise<boolean> {
    return this.reservationsService.delete({ res_id });
  }
}
