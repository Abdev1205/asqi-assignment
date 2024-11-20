import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
  TableFooter,
} from "@/components/ui/table"; // ShadCN Table
import { Employee } from "@/types/Employee";

interface EmployeeTableProps {
  data: Employee[];
  isLoading: boolean;
  methods: {
    refresh: () => void;
    delete: () => void;
    edit: () => void;
  };
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  isLoading,
  methods,
}) => {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "departments",
      header: "Departments",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.departments.map((dept) => (
            <span
              key={dept._id}
              className="px-[.7rem] py-1 text-[.8rem] text-green-600  rounded-full bg-green-50"
            >
              {dept.name}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white border rounded-lg ">
      {/* Table Section */}
      {isLoading ? (
        <div className="py-6 text-center">Loading...</div>
      ) : (
        <Table className="p-6 rounded-lg ">
          <TableHeader className="p-6 ">
            <TableRow className="rounded-[1rem] bg-primary/20 hover:bg-primary/20  ">
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-gray-700 p-[.8rem] "
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="transition-all hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-gray-500"
                >
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length} className="text-right">
                Showing 1 to {data.length} of {data.length} employees
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default EmployeeTable;
