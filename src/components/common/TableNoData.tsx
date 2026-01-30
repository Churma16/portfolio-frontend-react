import {TableCell, TableRow} from "@/components/ui/table.tsx";
import {HiOutlineCube} from "react-icons/hi2";

export default function TableNoData({data}: { data: string }) {
    return (
        <TableRow>
            <TableCell
                colSpan={7}
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