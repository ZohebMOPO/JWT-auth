import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import { User } from "./entity/User";

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
    @Arg("password") password: string
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid Login");
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("bad password lol");
    }
    return {
      accessToken: sign({ userId: user.id }, "jbcdjbcjsdbj", {
        expiresIn: "15m",
      }),
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
