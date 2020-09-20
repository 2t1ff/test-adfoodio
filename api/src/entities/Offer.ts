import { OfferType } from "src/types";
import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Offer extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;


  @Field(() => String)
  @Column()
  name!: string;


  @Field(() => String)
  @Column()
  type!: OfferType;

  @Field(() => Int)
  @Column()
  value!: number;
  @Field(() => Int)
  @Column()
  requiredMeals!: number;

  @Field(() => Int)
  @Column()
  requiredDrinks!: number;

  @Field(() => Int)
  @Column()
  requiredDesserts!: number;
}
