/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Datos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Datos" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Datos_name_key" ON "Datos"("name");
