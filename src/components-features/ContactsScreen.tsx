import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import { H1 } from "@/components-common/ui/Typography";
import React from "react";

import { DataTable } from "@/components-common/contacts-table/components/DataTable";

import tasks from "@/components-common/contacts-table/data/tasks.json";
import { columns } from "@/components-common/contacts-table/components/columns";
import { PageHeader } from "@/components-common/PageHeader";
import { Button } from "@/components-common/ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components-common/ui/DropdownMenu";

export const ContactsScreen = () => {
  const router = useRouter();
  return (
    <WorkspaceLayout activeNavItem="Contacts">
      <PageHeader title="Contacts" />
      <div className="mt-2">
        <DataTable
          data={tasks}
          columns={columns}
          actions={
            <React.Fragment>
              <Button size="sm" asChild>
                <Link
                  href={`/workspaces/${
                    router.query.workspaceId as string
                  }/contacts/new`}
                >
                  <PlusIcon className="mr-1" /> Add New
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <DotsVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    {/* <UploadCloudIcon size={16} className="mr-2" /> */}
                    Upload
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    {/* <DownloadCloudIcon size={16} className="mr-2" /> */}
                    Download All
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {/* <GearIcon className="mr-2" /> */}
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {/*  <QuestionMarkIcon className="mr-2" /> */}
                    Help
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </React.Fragment>
          }
        />
      </div>
    </WorkspaceLayout>
  );
};
