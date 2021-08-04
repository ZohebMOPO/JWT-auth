import { Query, Resolver } from "type-graphql";

@Resolver()
export class Resolvers {
  @Query(() => String)
  hello() {
    return "hi";
  }
}
