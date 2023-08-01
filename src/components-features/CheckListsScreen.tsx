import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import React from "react";
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
import { CheckList, CheckListItem } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components-common/ui/Card";
import { H4 } from "@/components-common/ui/Typography";
import { Separator } from "@/components-common/ui/Separator";
import { Form, FormField, FormLabel } from "@/components-common/ui/Form";
import { FormInput } from "lucide-react";
import { Checkbox } from "@/components-common/ui/Checkbox";
import { Label } from "@/components-common/ui/Label";
import { cn } from "@/lib-client/utils";

export const CheckListsScreen = () => {
  const router = useRouter();
  return (
    <WorkspaceLayout activeNavItem="Checklists">
      <PageHeader
        title="Checklists"
        pageActions={
          <React.Fragment>
            <Button size="sm" asChild>
              <Link
                href={`/workspaces/${
                  router.query.workspaceId as string
                }/checklists/new`}
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

      <div className="mt-8">
        <H4>Active</H4>
        <Separator className="mt-1" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Card>
            <CardHeader>New Buyer Checklist</CardHeader>
            <CardContent>
              <CardDescription>
                Small description of the check list
              </CardDescription>

              <form className="mt-4 flex flex-col gap-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Give welcome packet</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Schedule time to talk</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Pre-qualify</label>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Listing Appointment</CardHeader>
            <CardContent>
              <CardDescription>
                Small description of the check list
              </CardDescription>

              <form className="mt-4 flex flex-col gap-y-2">
                {Array.from({ length: 12 }).map((item, idx) => (
                  <div className="flex items-center space-x-2" key={idx}>
                    <Checkbox name={`task-${idx}`} className="peer" />
                    <label htmlFor={`task-${idx}`}>Task {idx + 1}</label>
                  </div>
                ))}
              </form>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>Client Offer</CardHeader>
            <CardContent>
              <CardDescription>
                Small description of the check list
              </CardDescription>

              <form className="mt-4 flex flex-col gap-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Pull Comps</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Contact Other Agent</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <label htmlFor="task1">Get the deposit</label>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
