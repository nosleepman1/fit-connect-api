/*
  Warnings:

  - You are about to drop the column `firstName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "firstName",
DROP COLUMN "lastName";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "VerificationCode" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_userId_key" ON "VerificationCode"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationCode_token_key" ON "VerificationCode"("token");

-- AddForeignKey
ALTER TABLE "VerificationCode" ADD CONSTRAINT "VerificationCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
