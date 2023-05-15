import { Field, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  wishlist_id: string;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
