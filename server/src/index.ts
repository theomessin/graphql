import { schema as gqlSchema } from "./graphql";
import { printSchema } from "graphql";

export const schema = printSchema(gqlSchema);
