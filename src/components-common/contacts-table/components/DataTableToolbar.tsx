import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { type Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./DataTableViewOptions";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { Input } from "@/components-common/ui/Input";
import { Button } from "@/components-common/ui/Button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">
          <PlusIcon className="mr-1" />
          Add New
        </Button>
      </div>
    </div>
  );
}
