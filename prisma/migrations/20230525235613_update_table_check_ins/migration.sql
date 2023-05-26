/*
  Warnings:

  - You are about to drop the column `is_valid` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "is_valid",
ADD COLUMN     "validated_at" TIMESTAMP(3);
