import type { Config } from "jest";

export default {
    globalSetup: "./test/globalSetup.ts",
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest",
    },
} satisfies Config;
