import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  res_id: string;

  @Column()
  @Field(() => String)
  res_date: string;

  @Column()
  @Field(() => Int)
  personnel: number;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
