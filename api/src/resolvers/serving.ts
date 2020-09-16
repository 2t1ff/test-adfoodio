import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Serving } from "../entities/Serving";
import { ServingCategory } from "../types";

@Resolver(Serving)
export class ServingResolver {
	@Mutation(() => Serving)
	async createServing(
		@Arg("name") name: string,
		@Arg("price") price: number,
		@Arg("description") description: string,
		@Arg("category") category: ServingCategory
	) {
		return Serving.create({ name, price, description, category }).save();
	}

	@Mutation(() => Boolean)
	async deleteServing(@Arg("id", () => Int) id: number) {
		await Serving.delete(id);
		return true;
	}

	@Query(() => [Serving])
	async getServings(): Promise<Serving[]> {
		const servings = await Serving.find({});
		return servings;
	}
}
