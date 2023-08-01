import { WorkspaceLayout } from "@/components-common/WorkspaceLayout";
import React from "react";

import { DataTable } from "@/components-common/contacts-table/components/DataTable";

import tasks from "@/components-common/contacts-table/data/tasks.json";
import { columns } from "@/components-common/contacts-table/components/columns";
import { PageTitle } from "@/components-common/PageTitle";
import {
  type ColumnDef,
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  flexRender,
} from "@tanstack/react-table";
import { Checkbox } from "@radix-ui/react-checkbox";

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components-common/ui/Table";
import { DataTableColumnHeader } from "@/components-common/contacts-table/components/DataTableColumnHeader";
import { DataTableToolbar } from "@/components-common/contacts-table/components/DataTableToolbar";
import { useRouter } from "next/router";
import { Button } from "@/components-common/ui/Button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components-common/ui/DropdownMenu";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";

export const TasksScreen = () => {
  const router = useRouter();
  const workspaceId = router.query.workspaceId as string;

  const table = useReactTable({
    columns: defaultColumns,
    data: fakeData,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  return (
    <WorkspaceLayout activeNavItem="Tasks">
      <PageTitle>Tasks</PageTitle>
      <div className="mt-2">
        {/*  <DataTable data={tasks} columns={columns} /> */}
        <DataTableToolbar
          table={table}
          actions={
            <React.Fragment>
              <Button size="sm" asChild>
                <Link
                  href={`/workspaces/${
                    router.query.workspaceId as string
                  }/tasks/new`}
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
        <div className="mt-3">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
          </Table>
        </div>
      </div>
    </WorkspaceLayout>
  );
};

type Task = {
  id: number;
  title: string;
  label?: string;
  status: string;
  priority: string;
  isFavorite: boolean;
};

const fakeData: Task[] = [
  {
    id: 1,
    title: "Task 1",
    label: "Label 1",
    status: "Status 1",
    priority: "Priority 1",
    isFavorite: true,
  },
  {
    id: 2,
    title: "Task 2",
    label: "Label 2",
    status: "Status 2",
    priority: "Priority 2",
    isFavorite: true,
  },
];

const defaultColumns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
  },
  {
    accessorKey: "id",
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
  },
  {
    accessorKey: "status",
  },
  {
    accessorKey: "priority",
  },
  {
    accessorKey: "isFavorite",
  },
];
