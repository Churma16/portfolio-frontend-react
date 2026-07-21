import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {HiOutlineCube} from "react-icons/hi2";

export default function TableNoData({data, colspan = 7}: { data: string; colspan?: number }) {
    return (
        <TableRow>
            <TableCell
                colSpan={colspan}
                className="h-32 text-center text-slate-500"
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <HiOutlineCube className="w-8 h-8 opacity-50"/>
                    <p>
                        No {data} found. Start by creating
                        one!
                    </p>
                </div>
            </TableCell>
        </TableRow>
    )
}