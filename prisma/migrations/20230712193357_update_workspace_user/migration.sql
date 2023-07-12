-- DropIndex
DROP INDEX "WorkspaceUser_workspaceId_userId_key";

-- AlterTable
ALTER TABLE "WorkspaceUser" ALTER COLUMN "userId" DROP NOT NULL;
