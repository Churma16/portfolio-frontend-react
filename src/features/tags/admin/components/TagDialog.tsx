import { useEffect, useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { CgSpinner } from "react-icons/cg";
import { Tag } from "../../../../types";
import apiClient from "@/api/axios.ts";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: Tag | null;
    onSuccess: () => void;
}

export default function TagDialog({
    open,
    onOpenChange,
    dataToEdit,
    onSuccess,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", color: "blue" });

    useEffect(() => {
        if (open) {
            setFormData({
                name: dataToEdit?.name || "",
                color: dataToEdit?.color || "blue",
            });
        }
    }, [open, dataToEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = dataToEdit ? `/tags/${dataToEdit.id}` : "/tags";

        try {
            if (dataToEdit) {
                await apiClient.put(url, formData);
            } else {
                await apiClient.post(url, formData);
            }
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving tag:", error);
            alert("Gagal menyimpan tag!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0f172a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Tag" : "Add Tag"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Tag Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="e.g. Mobile"
                            className="bg-black/20 border-white/10"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Color Theme</Label>
                        <Select
                            value={formData.color}
                            onValueChange={(val) =>
                                setFormData({ ...formData, color: val })
                            }
                        >
                            <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="yellow">Yellow</SelectItem>
                                <SelectItem value="purple">Purple</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-lara-blue"
                            disabled={isSubmitting}
                        >
                            {isSubmitting && (
                                <CgSpinner className="animate-spin mr-2" />
                            )}{" "}
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
