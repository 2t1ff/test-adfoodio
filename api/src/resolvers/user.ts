import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { Order } from "../entities/Order";
import { User } from "../entities/User";
import { MyContext } from "../types";
import { validateRegister } from "../utils/validateRegister";

@InputType()
export class UsernamePasswordInput {
  @Field()
  email?: string;

  @Field()
  username?: string;

  @Field()
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field!: string;
  @Field()
  message!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver()
  async orders(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session!.userId === user.id) {
      return await Order.find({ where: { userId: user.id } });
    }
    return [];
  }

  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session!.userId === user.id) {
      return user.email;
    }
    return "";
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    //not logged in
    if (!req.session?.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err.errno === 1062) {
        //Duplicate error code
        return {
          errors: [
            {
              field: "username",
              message: "the username has already been taken",
            },
          ],
        };
      }
      console.log("message: ", err.message);
    }

    //store user id session
    req.session!.userId = user?.id;
    return {
      user: user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session!.userId = user.id;
    return {
      user: user,
    };
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) =>
      req.session?.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
        }
        res.clearCookie(COOKIE_NAME);
        resolve(true);
      })
    );
  }
}
