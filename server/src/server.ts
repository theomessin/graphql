import { schema } from "./pothos";
import { createYoga } from "graphql-yoga";
import { createServer } from "node:http";

function main() {
    const yoga = createYoga({ schema });
    const server = createServer(yoga);

    server.listen(3000, () => {
        console.log("Visit http://localhost:3000/graphql");
    });
}

if (require.main === module) {
    main();
}
