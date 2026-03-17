/*
  Warnings:

  - Changed the type of `totalPrice` on the `FoodOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "FoodOrder" DROP COLUMN "totalPrice",
ADD COLUMN     "totalPrice" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleEnum" NOT NULL DEFAULT 'USER';
