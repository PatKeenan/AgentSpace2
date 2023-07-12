/*
  Warnings:

  - A unique constraint covering the columns `[workspaceId,userId]` on the table `WorkspaceUser` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `WorkspaceUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "WorkspaceUser" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceUser_workspaceId_userId_key" ON "WorkspaceUser"("workspaceId", "userId");
