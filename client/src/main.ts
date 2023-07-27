import { createClient } from "./genql";

async function main() {
    const client = createClient({
        url: "http://localhost:3000/graphql",
        headers: {
            Authorization: "Bearer xxx",
        },
    });

    const { clients } = await client.query({
        clients: {
            clientKey: true,
            clientName: true,
        },
    });

    console.log(JSON.stringify(clients, null, 2));
}

main();
