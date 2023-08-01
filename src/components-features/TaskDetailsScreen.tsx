import React from "react";
import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { PageTitle } from "@/components-common/PageTitle";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "lucide-react";

export const TaskDetailsScreen = () => {
  const [isEditMode, setIsEditMode] = React.useState(false);

  const router = useRouter();

  React.useLayoutEffect(() => {
    if (!router.pathname.includes("new")) {
      setIsEditMode(true);
    }
  }, [router.pathname]);
  return (
    <WorkspaceLayout activeNavItem="Tasks">
      <PageTitle
        backLink={{
          title: "Back",
          href: `/workspaces/${router.query.workspaceId as string}/tasks`,
          icon: ArrowLeftIcon,
        }}
      >
        {isEditMode ? "Edit" : "New"} Task
      </PageTitle>
      <div className="mt-2">
        {/*  <DataTable data={tasks} columns={columns} /> */}
      </div>
    </WorkspaceLayout>
  );
};
