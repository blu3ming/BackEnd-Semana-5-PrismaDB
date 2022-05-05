const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.json({message: "alive"});
});

app.get("/explorers", async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get("/explorers/:id", async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

app.post("/explorers", async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = "Explorer creado.";
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

app.put("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.explorer.update({
        where: {
            id: id
        },
        data: {
            mission: req.body.mission
        }
    });

    return res.json({message: "Actualizado correctamente"});
});

app.delete("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.explorer.delete({where: {id: id}});
    return res.json({message: "Eliminado correctamente"});
});

app.get("/datos", async (req, res) => {
    const allDatos =  await prisma.datos.findMany({});
    res.json(allDatos);
});

app.get("/datos/:id", async (req, res) => {
    const id = req.params.id;
    const datos = await prisma.datos.findUnique({where: {id: parseInt(id)}});
    res.json(datos);
});

app.post("/datos", async (req, res) => {
    const datos = {
        name: req.body.name,
        lang: req.body.lang,
        missionCommander: req.body.missionCommander,
        enrollments: req.body.enrollments
    };
    const message = "Datos creados";
    await prisma.datos.create({data: datos});
    return res.json({message});
});

app.put("/datos/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.datos.update({
        where: {
            id: id
        },
        data: {
            missionCommander: req.body.missionCommander
        }
    });

    return res.json({message: "Actualizado correctamente"});
});

app.delete("/datos/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.datos.delete({where: {id: id}});
    return res.json({message: "Eliminado correctamente"});
});

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});