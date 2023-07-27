import { assertSingleValue } from "../../test/assertSingleValue";
import { graphql } from "../gql";
import { getYogaServer } from "../yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

const yoga = getYogaServer();
const executor = buildHTTPExecutor({ fetch: yoga.fetch });

it("returns correct hotel", async () => {
    const document = graphql(`
        query hotel {
            hotel(apiKey: "32899e899dc042dda0fd938b2be21f91") {
                hotelName
                clientKey
            }
        }
    `);

    const result = await executor({ document });

    assertSingleValue(result);
    expect(result.data?.hotel).toBeDefined();
    expect(result.data?.hotel?.hotelName).toBe("New York");
    expect(result.data?.hotel?.clientKey).toBe("01EB4HF7W5448WNH2AA");
});

it("returns null if hotel not found", async () => {
    const document = graphql(`
        query hotelNull {
            hotel(apiKey: "this-should-not-exist") {
                hotelName
                clientKey
            }
        }
    `);

    const result = await executor({ document });

    assertSingleValue(result);
    expect(result.data?.hotel).toBeNull();
});
