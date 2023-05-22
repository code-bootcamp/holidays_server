import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
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

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0.0 })
  @Field(() => Float)
  lat: number;

  @Column({ type: 'decimal', precision: 6, scale: 3, default: 0.0 })
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

  @Column({ default: 0 })
  @Field(() => Int)
  is_ad: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @OneToMany(() => Image, (image_) => image_.class_)
  @Field(() => [Image])
  image_: Image[];
}
