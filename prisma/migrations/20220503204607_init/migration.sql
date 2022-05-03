-- CreateTable
CREATE TABLE "Datos" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "lang" VARCHAR(255) NOT NULL,
    "missionCommander" VARCHAR(255) NOT NULL,
    "enrollments" INTEGER NOT NULL,
    "hasCertification" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Datos_pkey" PRIMARY KEY ("id")
);
