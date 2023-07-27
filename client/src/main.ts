import { createClient } from "./genql";

async function main() {
    const client = createClient({
        url: "http://localhost:3000/graphql",
        headers: {
            Authorization: "Bearer xxx",
        },
    });

    const { user } = await client.query({
        user: {
            __args: { id: "1" },
            email: true,
        },
    });

    if (user === null) {
        throw new Error("Could not find user for id 1");
    }

    console.log(user.email);
}

main();
