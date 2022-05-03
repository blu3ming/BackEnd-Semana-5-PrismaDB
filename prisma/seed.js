const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
    try {
        const woopa = await prisma.explorer.upsert({
            where: { name: "Woopa" },
            update: {},
            create: {
                name: "Woopa",
                username: "ajolonauta",
                mission: "Node"
            },
        });

        const woopa1 = await prisma.explorer.upsert({
            where: { name: "Woopa1" },
            update: {},
            create: {
                name: "Woopa1",
                username: "ajolonauta1",
                mission: "Node"
            },
        });

        const woopa2 = await prisma.explorer.upsert({
            where: { name: "Woopa 2" },
            update: {},
            create: {
                name: "Woopa 2",
                username: "ajolonauta2",
                mission: "Java"
            },
        });

        const explorer1 = await prisma.datos.upsert({
            where: { name: "Explorer 1" },
            update: {},
            create: {
                name: "Explorer 1",
                lang: "spanish",
                missionCommander: "Carlo",
                enrollments: 3,
            },
        });

        const explorer2 = await prisma.datos.upsert({
            where: { name: "Explorer 2" },
            update: {},
            create: {
                name: "Explorer 2",
                lang: "spanish",
                missionCommander: "Carlo",
                enrollments: 1,
            },
        });

        const explorer3 = await prisma.datos.upsert({
            where: { name: "Explorer 3" },
            update: {},
            create: {
                name: "Explorer 3",
                lang: "english",
                missionCommander: "Carlo",
                enrollments: 2,
            },
        });

        console.log("Create 3 explorers");
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();