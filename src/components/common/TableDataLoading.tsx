import {TableCell, TableRow} from "@/components/ui/table.tsx";


export default function TableDataLoading({data}: { data: string }) {
    return (
        <TableRow>
            <TableCell
                colSpan={3}
                className="h-32 text-center"
            >
                <div className="flex flex-col items-center justify-center gap-3 text-lara-text-muted-dark/80">
                    {/* Simple SVG Spinner */}
                    <svg
                        className="h-6 w-6 animate-spin text-lara-primary"
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
                Loading {data} data...
            </span>
                </div>
            </TableCell>
        </TableRow>
    )
}