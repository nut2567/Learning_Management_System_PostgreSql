/*
  Warnings:

  - You are about to drop the column `instructorName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Instructor_Name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Instructor_Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "instructorName",
ADD COLUMN     "Instructor_Name" TEXT NOT NULL,
ALTER COLUMN "age" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_Instructor_Name_key" ON "User"("Instructor_Name");
