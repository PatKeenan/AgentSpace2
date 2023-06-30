/*
  Warnings:

  - Added the required column `status` to the `WorkspaceUser` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WorkspaceUserStatus" AS ENUM ('ACTIVE', 'INVITED', 'BANNED', 'REMOVED');

-- AlterTable
ALTER TABLE "WorkspaceUser" ADD COLUMN     "status" TEXT NOT NULL;
