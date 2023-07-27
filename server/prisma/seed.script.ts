import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.client.createMany({
        data: [
            { clientKey: "zxd47KQGAP", clientName: "ILIO" },
            { clientKey: "01EB4HF7W5448WNH2AA", clientName: "STAYPINEAPPLE" },
            { clientKey: "MjoZ83MaRR", clientName: "MCDREAMS" },
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
