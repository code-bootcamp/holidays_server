import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  cs_id: string;

  @Column()
  @Field(() => String)
  date: string;

  @Column()
  @Field(() => Int)
  remain: number;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
