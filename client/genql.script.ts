import path from "node:path";
import { generate } from "@genql/cli";
import schema from "server";

const output = path.join(__dirname, "src", "genql");
generate({ schema, output }).catch(console.error);
