import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Class } from 'src/apis/classes/entities/class.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ClASSAD_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

// graphql용으로 변환
registerEnumType(ClASSAD_STATUS_ENUM, {
  name: 'ClASSAD_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Class_Ad {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  ca_id: string;

  @Column()
  @Field(() => String)
  imp_uid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  method: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ type: 'enum', enum: ClASSAD_STATUS_ENUM })
  @Field(() => ClASSAD_STATUS_ENUM)
  status: ClASSAD_STATUS_ENUM;

  @JoinColumn()
  @OneToOne(() => Class)
  @Field(() => Class)
  class_: Class;
}
