import { $ } from "@cspotcode/zx";

export default async function () {
    $.verbose = false;
    await $`pnpm prisma migrate reset --skip-generate --force`;
}
