import { schema } from "./graphql";
import { createYoga } from "graphql-yoga";

let yogaServer: ReturnType<typeof createYogaServer> | null;

export function getYogaServer() {
    if (!yogaServer) {
        yogaServer = createYogaServer();
    }

    return yogaServer;
}

export function setYogaServer(server: typeof yogaServer) {
    yogaServer = server;
}

function createYogaServer() {
    return createYoga({ schema });
}
