import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/boards/entities/board.entity';
import { Class } from 'src/apis/classes/entities/class.entity';
import { Magazine } from 'src/apis/magazines/entities/magazine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  image_id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => Int)
  type: number;

  @Column({ default: 2 })
  @Field(() => Int)
  is_main: number;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;

  @ManyToOne(() => Board)
  @Field(() => Board)
  board_: Board;

  @ManyToOne(() => Magazine)
  @Field(() => Magazine)
  magazine_: Magazine;
}
