-- AlterTable
ALTER TABLE "CheckList" ADD COLUMN     "campaignId" TEXT;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "leadOwnerId" TEXT,
ADD COLUMN     "leadScore" INTEGER,
ADD COLUMN     "leadStatus" TEXT,
ADD COLUMN     "touchHistory" JSONB;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "campaignId" TEXT;

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "successRate" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "reoccurring" BOOLEAN,
    "reoccurringInterval" TEXT,
    "reoccurringIntervalCount" INTEGER,
    "reoccurringIntervalEndsAt" TIMESTAMP(3),
    "reoccurringIntervalEndsAfter" INTEGER,
    "reoccurringIntervalEndsType" TEXT,
    "reoccurringIntervalEndsOnDate" TIMESTAMP(3),
    "reoccurringIntervalEndsAfterCount" INTEGER,
    "reoccurringIntervalEndsAfterType" TEXT,
    "unsubscribeLink" TEXT,
    "unsubscribeMessage" TEXT,
    "unsubscribeRedirectUrl" TEXT,
    "unsubscribeRedirectMessage" TEXT,
    "budget" DOUBLE PRECISION,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "hours" DOUBLE PRECISION,
    "mileage" DOUBLE PRECISION,
    "paidAt" TIMESTAMP(3),
    "paidBy" TEXT,
    "paidAmount" DOUBLE PRECISION,
    "paidMethod" TEXT,
    "paidNote" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "status" TEXT,
    "dueAt" TIMESTAMP(3),
    "receipt" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CampaignToContact" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CampaignToExpense" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToContact_AB_unique" ON "_CampaignToContact"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToContact_B_index" ON "_CampaignToContact"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CampaignToExpense_AB_unique" ON "_CampaignToExpense"("A", "B");

-- CreateIndex
CREATE INDEX "_CampaignToExpense_B_index" ON "_CampaignToExpense"("B");

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "WorkspaceUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "WorkspaceUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToContact" ADD CONSTRAINT "_CampaignToContact_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToContact" ADD CONSTRAINT "_CampaignToContact_B_fkey" FOREIGN KEY ("B") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToExpense" ADD CONSTRAINT "_CampaignToExpense_A_fkey" FOREIGN KEY ("A") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CampaignToExpense" ADD CONSTRAINT "_CampaignToExpense_B_fkey" FOREIGN KEY ("B") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
