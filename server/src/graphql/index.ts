import { getPrismaClient } from "../prisma";
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
        hotels: t.relation("hotels"),
    }),
});

builder.prismaObject("Hotel", {
    fields: (t) => ({
        apiKey: t.exposeID("apiKey"),
        clientKey: t.exposeString("clientKey"),
        hotelName: t.exposeString("hotelName"),
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
        hotels: t.prismaField({
            type: ["Hotel"],
            resolve: async (query) => {
                const prisma = getPrismaClient();
                return prisma.hotel.findMany({ ...query });
            },
        }),
        hotel: t.prismaField({
            type: "Hotel",
            nullable: true,
            args: {
                apiKey: t.arg.id({ required: true }),
            },
            resolve: async (query, _, { apiKey }) => {
                const prisma = getPrismaClient();
                return prisma.hotel.findUnique({
                    ...query,
                    where: { apiKey: apiKey.toString() },
                });
            },
        }),
    }),
});

export const schema = builder.toSchema();
