/*
  Warnings:

  - You are about to drop the column `descdription` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "descdription",
ADD COLUMN     "description" TEXT;
