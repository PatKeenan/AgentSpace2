/*
  Warnings:

  - The values [MEMBER,ANONYMOUS] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `WorkspaceUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `SecurityPolicy` table. If the table is not empty, all the data it contains will be lost.
  - The required column `id` was added to the `WorkspaceUser` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');
ALTER TABLE "WorkspaceUser" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "SecurityPolicy" DROP CONSTRAINT "SecurityPolicy_workspaceId_fkey";

-- DropIndex
DROP INDEX "WorkspaceUser_email_workspaceId_key";

-- AlterTable
ALTER TABLE "WorkspaceUser" DROP CONSTRAINT "WorkspaceUser_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ADD CONSTRAINT "WorkspaceUser_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "SecurityPolicy";
