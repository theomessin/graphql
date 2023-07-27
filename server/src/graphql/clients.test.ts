import { assertSingleValue } from "../../test/assertSingleValue";
import { graphql } from "../gql";
import { getYogaServer } from "../yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";

const yoga = getYogaServer();
const executor = buildHTTPExecutor({ fetch: yoga.fetch });

it("returns one client", async () => {
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
    expect(result.data?.clients).toHaveLength(1);
    expect(result.data?.clients[0]?.clientName).toBe("STAYPINEAPPLE");
});

it("includes hotel", async () => {
    const document = graphql(`
        query clientsWithHotels {
            clients {
                clientKey
                clientName
                hotels {
                    apiKey
                    hotelName
                }
            }
        }
    `);

    const result = await executor({ document });

    assertSingleValue(result);
    expect(result.data?.clients).toHaveLength(1);
    expect(result.data?.clients[0]?.clientName).toBe("STAYPINEAPPLE");
    expect(result.data?.clients[0]?.hotels).toHaveLength(1);
    expect(result.data?.clients[0]?.hotels[0]?.hotelName).toBe("New York");
});
