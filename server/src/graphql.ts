import { getPrismaClient } from "./prisma";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@pothos/plugin-prisma/generated";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import { Prisma } from "@prisma/client";

const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
}>({
    plugins: [PrismaPlugin, SimpleObjectsPlugin],
    prisma: {
        client: () => getPrismaClient(),
        dmmf: Prisma.dmmf,
        exposeDescriptions: true,
        filterConnectionTotalCount: true,
    },
});

builder.prismaObject("Client", {
    fields: (t) => ({
        clientKey: t.exposeID("clientKey"),
        clientName: t.exposeString("clientName"),
    }),
});

builder.queryType({
    fields: (t) => ({
        clients: t.prismaField({
            type: ["Client"],
            resolve: async (query) => {
                const prisma = getPrismaClient();
                return prisma.client.findMany({ ...query });
            },
        }),
    }),
});

export const schema = builder.toSchema();
