import { assertSingleValue } from "../../test/assertSingleValue";
import { graphql } from "../gql";
import { getYogaServer } from "../yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

const yoga = getYogaServer();
const executor = buildHTTPExecutor({ fetch: yoga.fetch });

it("returns one hotel", async () => {
    const document = graphql(`
        query hotels {
            hotels {
                apiKey
                hotelName
                clientKey
            }
        }
    `);

    const result = await executor({ document });

    assertSingleValue(result);
    expect(result.data?.hotels).toHaveLength(1);
    expect(result.data?.hotels[0]?.hotelName).toBe("New York");
    expect(result.data?.hotels[0]?.clientKey).toBe("01EB4HF7W5448WNH2AA");
});
