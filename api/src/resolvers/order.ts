import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { MyContext } from "../types";

@InputType()
class CartItem {
  @Field(() => Int)
  servingId!: number;

  @Field(() => Int)
  quantity!: number;
}

@Resolver(Order)
export class OrderResolver {
  @FieldResolver()
  async orderItems(@Root() order: Order) {
    return await OrderItem.find({ where: { orderId: order.id } });
  }

  @Mutation(() => Order)
  async createOrder(
    @Arg("cartItems", () => [CartItem]) cartItems: CartItem[],
    @Arg("totalPrice") totalPrice: number,
    @Ctx() { req }: MyContext
  ) {
    const order = await Order.create({ userId: req.session!.userId, totalPrice }).save();

    const orderItems = await Promise.all(
      cartItems.map((item) => {
        return OrderItem.create({
          servingId: item.servingId,
          quantity: item.quantity,
          orderId: order.id,
        }).save();
      })
    );
    order.orderItems = orderItems;
    new Promise(() =>
      setTimeout(async () => {
        await Order.update({ id: order.id }, { state: "ready" });
        new Promise(() =>
          setTimeout(async () => {
            await Order.update({ id: order.id }, { state: "picked up" });
          }, 30000)
        );
      }, 30000)
    );
    return order;
  }

  @Query(() => [Order])
  getOrders(
    @Ctx() {req} : MyContext
  ){
    return Order.find({userId: req.session?.userId})
  }

}
