import { createWithApollo } from "./createWithApollo";
import { createClient } from "../lib/gqlClient";

export const withApollo = createWithApollo(createClient);
