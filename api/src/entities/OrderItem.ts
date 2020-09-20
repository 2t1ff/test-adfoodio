import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order";
import { Serving } from "./Serving";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Int)
  @Column()
  orderId!: number;

  @Field(() => Order)
  @ManyToOne(() => Order, (order) => order.orderItems)
  order!: Order;

  @Field(() => Int)
  @Column()
  servingId!: number;

  @Field(() => Serving)
  @ManyToOne(() => Serving)
  async serving(){
      return await Serving.findOne({id: this.servingId})
  }

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
