import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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
export class Class {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  class_id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  content_summary: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column()
  @Field(() => Int)
  class_mNum: number;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  address_detail: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  @Field(() => Float)
  lon: number;

  @Column()
  @Field(() => String)
  category: string;

  @Column()
  @Field(() => String)
  address_category: string;

  @Column()
  @Field(() => String)
  total_time: string;

  @Column()
  @Field(() => String)
  content: string;

  @Column()
  @Field(() => String)
  accountNum: string;

  @Column()
  @Field(() => String)
  accountName: string;

  @Column()
  @Field(() => String)
  bankName: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;
}
