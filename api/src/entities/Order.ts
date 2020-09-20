import { OrderState } from "src/types";
import { Field, Int, ObjectType } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  userId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId)
  orderItems!: OrderItem[];

  @Field(() => String)
  @Column({ default: "kitchen" })
  state!: OrderState;

  @Field(() => String)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt!: Date;
}
