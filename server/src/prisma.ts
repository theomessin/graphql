import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient | null;

export function getPrismaClient(): PrismaClient {
    if (!prismaClient) {
        prismaClient = new PrismaClient();
    }

    return prismaClient;
}

export function setPrismaClient(client: PrismaClient) {
    prismaClient = client;
}
