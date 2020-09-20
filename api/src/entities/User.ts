import { ObjectType, Field, Int } from "type-graphql";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BaseEntity, OneToMany
} from "typeorm";
import { Order } from "./Order";

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(() => String)
	@Column({ unique: true })
	username!: string;

	@Field(() => String)
	@Column({ unique: true })
	email!: string;

	@Column()
	password!: string;

	@Field(() => String)
	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => [Order])
	@OneToMany(() => Order, order => order.user)
	orders!: Order[]

	@Field(() => String)
	@UpdateDateColumn()
	updatedAt!: Date;
}
