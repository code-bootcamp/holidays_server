import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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

  @Column({ length: 300 })
  @Field(() => String)
  content: string;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  @Field(() => Float)
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
