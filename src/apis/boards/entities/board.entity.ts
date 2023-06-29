import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardPost } from 'src/apis/board_posts/entities/board_post.entity';
import { Image } from 'src/apis/images/entities/image.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  board_id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column({ type: 'text' })
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @OneToMany(() => Image, (image_) => image_.board_)
  @Field(() => [Image])
  image_: Image[];

  @OneToMany(() => BoardPost, (bp_) => bp_.board_)
  @Field(() => [BoardPost])
  bp_: BoardPost[];
}
