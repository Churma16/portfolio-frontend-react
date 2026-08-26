import React from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx";
import TableDataLoading from "./TableDataLoading.tsx";
import TableNoData from "./TableNoData.tsx";
import {HiOutlineCube, HiOutlineExclamationTriangle} from "react-icons/hi2";

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
    renderMobileCard?: (item: T, index: number) => React.ReactNode;
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
    renderMobileCard,
}: DataTableProps<T>) {
    const colSpan = columns.length;

    const renderDesktopContent = () => {
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

    const renderMobileContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center p-8 bg-card/50 rounded-xl border border-border/40 gap-3 text-muted-foreground text-center">
                    <svg
                        className="h-6 w-6 animate-spin text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span className="text-sm font-medium animate-pulse">
                        Loading {dataName} data...
                    </span>
                </div>
            );
        }

        if (isError) {
            return (
                <div className="flex flex-col items-center justify-center p-8 bg-card/50 rounded-xl border border-destructive/30 text-destructive gap-2 text-center">
                    <HiOutlineExclamationTriangle className="w-8 h-8 opacity-80" />
                    <p className="text-sm">{errorMessage}</p>
                </div>
            );
        }

        if (data.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center p-8 bg-card/50 rounded-xl border border-border/40 text-muted-foreground gap-2 text-center">
                    <HiOutlineCube className="w-8 h-8 opacity-50" />
                    <p className="text-sm">No {dataName} found. Start by creating one!</p>
                </div>
            );
        }

        // Identify specialized columns for default mobile card layout
        const idColumn = columns.find(
            (c) => typeof c.header === "string" && c.header.toLowerCase().includes("id")
        );
        const actionsColumn = columns.find(
            (c) => typeof c.header === "string" && c.header.toLowerCase().includes("action")
        );
        const orderColumn = columns.find(
            (c) => typeof c.header === "string" && c.header.toLowerCase().includes("order")
        );
        const contentColumns = columns.filter(
            (c) => c !== idColumn && c !== actionsColumn && c !== orderColumn
        );

        return (
            <div className="space-y-3">
                {data.map((item, rowIndex) => {
                    const rowKey = keyExtractor
                        ? keyExtractor(item, rowIndex)
                        : (item as unknown as { id: string | number }).id ?? rowIndex;

                    if (renderMobileCard) {
                        return (
                            <div key={rowKey}>
                                {renderMobileCard(item, rowIndex)}
                            </div>
                        );
                    }

                    return (
                        <div
                            key={rowKey}
                            className="bg-card/70 border border-border/50 rounded-xl p-4 space-y-3 backdrop-blur-sm shadow-md"
                        >
                            {/* Card Header with ID and Actions/Order */}
                            {(idColumn || actionsColumn || orderColumn) && (
                                <div className="flex items-center justify-between gap-2 border-b border-border/30 pb-2.5">
                                    <div className="flex items-center gap-2">
                                        {idColumn && (
                                            <span className="text-xs font-mono text-muted-foreground">
                                                {idColumn.cell
                                                    ? idColumn.cell(item, rowIndex)
                                                    : idColumn.key
                                                    ? (item[idColumn.key as keyof T] as React.ReactNode)
                                                    : null}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {orderColumn && (
                                            <div className="flex items-center">
                                                {orderColumn.cell
                                                    ? orderColumn.cell(item, rowIndex)
                                                    : null}
                                            </div>
                                        )}
                                        {actionsColumn && (
                                            <div className="flex items-center">
                                                {actionsColumn.cell
                                                    ? actionsColumn.cell(item, rowIndex)
                                                    : null}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Card Body */}
                            <div className="space-y-2.5">
                                {contentColumns.map((column, colIndex) => {
                                    const cellValue = column.cell
                                        ? column.cell(item, rowIndex)
                                        : column.key
                                        ? (item[column.key as keyof T] as React.ReactNode)
                                        : null;

                                    return (
                                        <div key={colIndex} className="text-sm">
                                            {contentColumns.length > 1 && (
                                                <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                                                    {column.header}
                                                </div>
                                            )}
                                            <div className={column.cellClassName}>
                                                {cellValue}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div>
            {/* Desktop Table View */}
            <div className={`hidden md:block ${containerClassName}`}>
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
                    <TableBody>{renderDesktopContent()}</TableBody>
                </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden">
                {renderMobileContent()}
            </div>
        </div>
    );
}
