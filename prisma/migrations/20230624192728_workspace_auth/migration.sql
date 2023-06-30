/*
  Warnings:

  - Changed the type of `status` on the `WorkspaceUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WorkspaceUser" DROP COLUMN "status",
ADD COLUMN     "status" "WorkspaceUserStatus" NOT NULL;
