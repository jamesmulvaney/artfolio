import { Query, Resolver } from "type-graphql";

@Resolver()
export class TestResolver {
  @Query(() => String)
  testQuery() {
    return "This is a GraphQL test query!";
  }
}
