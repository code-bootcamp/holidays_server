import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RESERVATION_STATUS_ENUM {
  COMPLETE = 'COMPLETE',
  WAITING = 'WAITING',
}

// graphql용으로 변환
registerEnumType(RESERVATION_STATUS_ENUM, {
  name: 'RESERVATION_STATUS_ENUM',
});

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

  @Column({ type: 'enum', enum: RESERVATION_STATUS_ENUM })
  @Field(() => RESERVATION_STATUS_ENUM)
  status: RESERVATION_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  user_: User;

  @ManyToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
