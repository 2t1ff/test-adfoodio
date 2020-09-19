import { ObjectType, Field, Int, Float } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ServingCategory } from "../types";

@ObjectType() //Type-GraphQL decorator to make it an object
@Entity() //TypeORM decorator to make the class a table in the DB
export class Serving extends BaseEntity {
	
	@Field(() => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field()
	@Column()
	name!: string;

	@Field(()=> Float)
	@Column({type: "float"})
	price!: number;

	@Field()
	@Column()
	description!: string;

	@Field(() => String)
	@Column()
	category!: ServingCategory;


    @Field(() => String)
    @CreateDateColumn()
    createdAt!: Date; 

    @Field(() => String)
    @CreateDateColumn()
    updatedAt!: Date; 
}
