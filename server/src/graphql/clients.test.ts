import { assertSingleValue } from "../../test/assertSingleValue";
import { graphql } from "../gql";
import { getYogaServer } from "../yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

const yoga = getYogaServer();
const executor = buildHTTPExecutor({ fetch: yoga.fetch });

it("returns three clients", async () => {
    const document = graphql(`
        query clients {
            clients {
                clientKey
                clientName
            }
        }
    `);

    const result = await executor({ document });

    assertSingleValue(result);
    // Assuming that we've ran the seed script...
    expect(result.data?.clients).toHaveLength(3);
});
