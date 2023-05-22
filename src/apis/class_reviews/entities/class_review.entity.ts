import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class ClassReview {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  cr_id: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => Int)
  grade: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
