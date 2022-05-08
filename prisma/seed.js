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

        const commander1 = await prisma.missionCommander.upsert({
            where: { name: "Mission Commander 1" },
            update: {},
            create: {
                name: "Mission Commander 1",
                username: "mcGio",
                mainStack: "Node",
                currentEnrollment: true,
                hasAzureCertification: true
            },
        });

        const commander2 = await prisma.missionCommander.upsert({
            where: { name: "Mission Commander 2" },
            update: {},
            create: {
                name: "Mission Commander 2",
                username: "mcCarlo",
                mainStack: "Java",
                currentEnrollment: true
            },
        });

        const commander3 = await prisma.missionCommander.upsert({
            where: { name: "Mission Commander 3" },
            update: {},
            create: {
                name: "Mission Commander 3",
                username: "mcArenas",
                mainStack: "Node"
            },
        });

        console.log("Data added do DB");
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();