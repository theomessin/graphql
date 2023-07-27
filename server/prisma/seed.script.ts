import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.client.createMany({
        data: [
            {
                clientKey: "01EB4HF7W5448WNH2AA",
                clientName: "STAYPINEAPPLE",
            },
        ],
    });

    await prisma.hotel.createMany({
        data: [
            {
                clientKey: "01EB4HF7W5448WNH2AA",
                apiKey: "32899e899dc042dda0fd938b2be21f91",
                hotelName: "New York",
            },
        ],
    });
}

main()
    .catch(async (e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
