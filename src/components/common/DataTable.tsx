import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import TableDataLoading from "./TableDataLoading.tsx";
import TableNoData from "./TableNoData.tsx";
import {HiOutlineExclamationTriangle} from "react-icons/hi2";

export interface ColumnDef<T> {
    header: React.ReactNode;
    key?: string;
    headerClassName?: string;
    cellClassName?: string;
    cell?: (item: T, index: number) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    dataName: string;
    keyExtractor?: (item: T, index: number) => string | number;
    containerClassName?: string;
}

export default function DataTable<T>({
    data,
    columns,
    isLoading = false,
    isError = false,
    errorMessage = "Failed to load data.",
    dataName,
    keyExtractor,
    containerClassName = "rounded-xl border border-white/10 bg-background-blue/50 overflow-hidden",
}: DataTableProps<T>) {
    const colSpan = columns.length;

    const renderContent = () => {
        if (isLoading) {
            return <TableDataLoading data={dataName} colspan={colSpan} />;
        }

        if (isError) {
            return (
                <TableRow>
                    <TableCell colSpan={colSpan} className="h-32 text-center text-destructive">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <HiOutlineExclamationTriangle className="w-8 h-8 opacity-80" />
                            <p>{errorMessage}</p>
                        </div>
                    </TableCell>
                </TableRow>
            );
        }

        if (data.length === 0) {
            return <TableNoData data={dataName} colspan={colSpan} />;
        }

        return data.map((item, rowIndex) => {
            const rowKey = keyExtractor
                ? keyExtractor(item, rowIndex)
                : (item as unknown as { id: string | number }).id ?? rowIndex;

            return (
                <TableRow
                    key={rowKey}
                    className="border-white/5 hover:bg-white/5 transition-colors"
                >
                    {columns.map((column, colIndex) => {
                        const cellValue =
                            column.cell
                                ? column.cell(item, rowIndex)
                                : column.key
                                ? (item[column.key as keyof T] as React.ReactNode)
                                : null;

                        return (
                            <TableCell
                                key={colIndex}
                                className={column.cellClassName}
                            >
                                {cellValue}
                            </TableCell>
                        );
                    })}
                </TableRow>
            );
        });
    };

    return (
        <div className={containerClassName}>
            <Table>
                <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5 hover:bg-transparent">
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={column.headerClassName || "text-slate-300"}
                            >
                                {column.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>{renderContent()}</TableBody>
            </Table>
        </div>
    );
}
