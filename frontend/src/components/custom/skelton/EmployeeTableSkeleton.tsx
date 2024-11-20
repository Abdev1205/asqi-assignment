import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
} from "@/components/ui/table"; // ShadCN Table
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton

const EmployeeTableSkeleton: React.FC = () => {
  return (
    <div className="bg-white border rounded-lg">
      <Table className="p-6 rounded-lg">
        <TableHeader className="p-6">
          <TableRow className="bg-primary/20">
            <TableHead className="font-semibold text-gray-700 p-[.8rem]">
              <Skeleton className="w-[100px] h-[20px]" />
            </TableHead>
            <TableHead className="font-semibold text-gray-700 p-[.8rem]">
              <Skeleton className="w-[100px] h-[20px]" />
            </TableHead>
            <TableHead className="font-semibold text-gray-700 p-[.8rem]">
              <Skeleton className="w-[150px] h-[20px]" />
            </TableHead>
            <TableHead className="font-semibold text-gray-700 p-[.8rem]">
              <Skeleton className="w-[80px] h-[20px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index} className="transition-all hover:bg-gray-50">
              <TableCell>
                <Skeleton className="w-[150px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[200px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[250px] h-[20px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-[100px] h-[20px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeeTableSkeleton;
