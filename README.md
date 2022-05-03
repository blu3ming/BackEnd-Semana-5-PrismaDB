# BackEnd Semana 5 - Práctica de PrismaDB con API

# 1. Conexión a Base de Datos Postgresql

1.  Para este proyecto requerimos la dependencia de Express y de Prisma DB (este último nos ayudará a conectarnos a Postgresql)

```
npm install express --save-dev
npm install prisma --save-dev
```

2. Inicializamos prisma con: `npx prisma init` y modificamos el archivo `.env`, con el usuario y password de la db:

`.env`
```
DATABASE_URL="postgresql://TUUSUARIO:PASSWORD@localhost:5432/explorers_api?schema=public"
```

3. Abre el archivo `prisma/schema.prisma` agregamos un nuevo modelo Explorer, el cual creará una tabla con el mismo nombre en la db. Esta tabla tendrá la siguiente estructura:

| Campo | Tipo de Dato |
|---|---|
| id | Integer (autogenerado) |
| name | String |
| username | String |
| mission | String |
| azureCertification | Boolean |

```
model Explorer {
  id Int @id @default(autoincrement())
  name String @unique
  username String @db.VarChar(255)
  mission String @db.VarChar(255)
  azureCertification Boolean @default(false)
  dateCreated DateTime @default(now())
  lastUpdated DateTime @updatedAt
}
```

4. Creamos un archivo `prisma/seed.js`, donde podemos colocar datos para insertarlos de forma automatizada en la db:

`seed.js`
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async function main() {
  try {
    const woopa = await prisma.explorer.upsert({
      where: { name: 'Woopa' },
      update: {},
      create: {
        name: 'Woopa',
				username: 'ajolonauta',
				mission: 'Node'
      },
    });

    const woopa1 = await prisma.explorer.upsert({
      where: { name: 'Woopa1' },
      update: {},
      create: {
        name: 'Woopa1',
				username: 'ajolonauta1',
				mission: 'Node'
      },
    });

    const woopa2 = await prisma.explorer.upsert({
      where: { name: 'Woopa 2' },
      update: {},
      create: {
        name: 'Woopa 2',
				username: 'ajolonauta2',
				mission: 'Java'
      },
    });

    console.log('Create 3 explorers');
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
```

# 2. CRUD 

1. Creamos el archivo `server.js` con el cual interactuaremos con Prisma por medio de una API. Este contendrá los elementos necesarios para un servicio CRUD, el cual nos permitirá leer, crear, modificar y eliminar entradas desde la API en la db:

`server.js`
``` javascript
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Require para usar Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.get('/explorers', async (req, res) => {
  const allExplorers =  await prisma.explorer.findMany({});
  res.json(allExplorers);
});

app.get('/explorers/:id', async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
  res.json(explorer);
});

app.post('/explorers', async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission
   };
  const message = 'Explorer creado.';
  await prisma.explorer.create({data: explorer});
  return res.json({message});
});

app.put('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);

	await prisma.explorer.update({
		where: {
			id: id
		},
		data: {
			mission: req.body.mission
		}
	})

	return res.json({message: "Actualizado correctamente"});
});

app.delete('/explorers/:id', async (req, res) => {
	const id = parseInt(req.params.id);
	await prisma.explorer.delete({where: {id: id}});
	return res.json({message: "Eliminado correctamente"});
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
```

# 3. Agregamos una nueva tabla y creamos el API

| Campo | Tipo de Dato |
|---|---|
| id | Integer (autogenerado) |
| name | String |
| lang | String |
| missionCommander | String |
| enrollments | Integer |
| hasCertification | Boolean |

1. Creamos el modelo en el `schema.prisma`, quedando de la siguiente manera:

```
model Datos {
  id Int @id @default(autoincrement())
  name String @unique
  lang String @db.VarChar(255)
  missionCommander String @db.VarChar(255)
  enrollments Int
  hasCertification Boolean @default(false)
}
```

2. Agregamos un par de registros en el `seed.js`. Verificamos que en la DB estén estos nuevos registros.

![image](https://user-images.githubusercontent.com/25083316/166569739-261a2958-3f2c-439a-8885-3f885d828a70.png)

3. Por último, creamos un CRUD para esta tabla en el archivo `server.js`, de igual manera que en la tabla anterior (Explorers):

Este último modelo puede corroborarse con la siguiente colección de Posrman, esto para probar todos los endpoints: [Explorers API.CRUD.zip](https://github.com/blu3ming/BackEnd-Semana-5-PrismaDB/files/8614418/Explorers.API.CRUD.zip)

De esta forma podemos tanto consultar los datos:

![image](https://user-images.githubusercontent.com/25083316/166570123-4073beda-ddbb-4de0-b633-81ad335e3562.png)

Podemos consultar los datos de un explorer en específico solo proporcionando un id:

![image](https://user-images.githubusercontent.com/25083316/166570173-96072c9c-3b2a-4619-a310-eb84fce48fce.png)

Podemos crear un nuevo explorer enviando datos por medio del body en formato json:

![image](https://user-images.githubusercontent.com/25083316/166570208-129e43ae-4849-473d-a156-53ac9d0f793c.png)

Podemos modificar el missionCommander de un explorer solo proporcionando el id y el nuevo valor de la entrada correspondiente:

![image](https://user-images.githubusercontent.com/25083316/166570260-105e3bb2-ebfd-4d46-a99d-5b4b6d73fc24.png)

Y por último, podemos eliminar cualquier entrada solo proporcionando el id correspondiente:

![image](https://user-images.githubusercontent.com/25083316/166570309-9474be0e-a032-4cff-8c03-793a5e6f87eb.png)
