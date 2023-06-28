import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class BoardPost {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  bp_id: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board_: Board;
}
