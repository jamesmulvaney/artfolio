import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

export const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({
      typePolicies: {
        User: {
          fields: {
            posts: {
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
            likedPosts: {
              merge(existing = [], incoming: any[]) {
                return [...incoming];
              },
            },
          },
        },
      },
    }),
  });
