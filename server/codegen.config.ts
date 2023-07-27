import { schema } from "./src/index";
import { type CodegenConfig } from "@graphql-codegen/cli";

export default {
    schema,
    documents: ["./src/**/*.test.ts"],
    generates: {
        "./src/gql/": {
            preset: "client-preset",
        },
    },
} satisfies CodegenConfig;
