import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  user_id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  pwd: string;

  @Column({ nullable: true })
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String)
  birth_date: string;

  @Column()
  @Field(() => Int)
  type: number;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;
}
