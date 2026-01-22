import {Button} from "@/components/ui/button.tsx";
import {HiPencil} from "react-icons/hi2";

interface EditButtonProps<T> {
    item: T;
    onEdit: (item: T) => void;
}

export default function EditButton<T>({item, onEdit}: EditButtonProps<T>) {
    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={() => onEdit(item)}
            className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
        >
            <HiPencil className="w-4 h-4"/>
        </Button>
    );
}
