import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { H1 } from "@/components-common/ui/Typography";
import React from "react";

import { DataTable } from "@/components-common/contacts-table/components/DataTable";

import tasks from "@/components-common/contacts-table/data/tasks.json";
import { columns } from "@/components-common/contacts-table/components/columns";

export const ContactScreen = () => {
  return (
    <WorkspaceLayout activeNavItem="Contacts">
      <H1 theme="pageTitle">Contacts</H1>
      <div className="mt-2">
        <DataTable data={tasks} columns={columns} />
      </div>
    </WorkspaceLayout>
  );
};
