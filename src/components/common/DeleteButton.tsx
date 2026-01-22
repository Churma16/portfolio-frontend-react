import {Button} from "@/components/ui/button.tsx";
import {HiTrash} from "react-icons/hi2";

interface DeleteButtonProps<T> {
    item: T;
    onDelete: (item: T) => void;
}

export default function DeleteButton<T>({item, onDelete}: DeleteButtonProps<T>) {
    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(item)}
            className="h-8 w-8 text-lara-text-muted hover:text-foreground hover:bg-white/10"
        >
            <HiTrash className="w-4 h-4"/>
        </Button>
    );
}
