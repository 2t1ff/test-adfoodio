import { Offer } from "../entities/Offer";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Order } from "../entities/Order";
import { OfferType } from "src/types";

@Resolver(Order)
export class OfferResolver {
  @Query(() => [Offer])
  getOffers() {
    return Offer.find({});
  }

  @Mutation(() => Offer)
  async createOffer(
      @Arg("type", () => String) type: OfferType,
      @Arg("value", () => Int) value: number,
      @Arg("requiredMeals", () => Int) requiredMeals: number,
      @Arg("requiredDrinks", () => Int) requiredDrinks: number,
      @Arg("requiredDesserts", () => Int) requiredDesserts: number,
      @Arg("name") name: string
      ) {
       return await Offer.create({type, value, requiredMeals, requiredDrinks, requiredDesserts, name}).save()
      }
}
