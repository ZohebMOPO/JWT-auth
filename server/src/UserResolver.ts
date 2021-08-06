import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { compare, hash } from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./ContextTypes";
import { createAccessToken, createRefreshToken } from "./auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class Resolvers {
  @Query(() => String)
  hello() {
    return "hi";
  }
  @Query(() => [User])
  users() {
    return User.find();
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid Login");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password lol");
    }

    res.cookie("jid", createRefreshToken(user), {
      httpOnly: true,
    });
    return {
      accessToken: createAccessToken(user),
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
