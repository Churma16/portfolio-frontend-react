import { useEffect, useState, FormEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";
import { TechStack } from "@/types";
import TechIcon from "@/components/common/TechIcon";
import apiClient from "@/api/axios";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    dataToEdit?: TechStack | null;
    onSuccess: () => void;
}

export default function TechStackDialog({
    open,
    onOpenChange,
    dataToEdit,
    onSuccess,
}: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: "", icon: "" });

    useEffect(() => {
        if (open) {
            setFormData({
                name: dataToEdit?.name || "",
                icon: dataToEdit?.icon || "",
            });
        }
    }, [open, dataToEdit]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const url = dataToEdit
            ? `/tech-stacks/${dataToEdit.id}`
            : "/tech-stacks";

        try {
            if (dataToEdit) {
                await apiClient.put(url, formData);
            } else {
                await apiClient.post(url, formData);
            }
            onSuccess();
            onOpenChange(false);
        } catch (error) {
            console.error("Error saving tech stack:", error);
            alert("Gagal menyimpan tech stack!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#0f172a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle>
                        {dataToEdit ? "Edit Tech Stack" : "Add Tech Stack"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            placeholder="e.g. Laravel"
                            className="bg-black/20 border-white/10"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Icon Name (React Icons)</Label>
                        <Input
                            value={formData.icon}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    icon: e.target.value,
                                })
                            }
                            placeholder="e.g. SiLaravel"
                            className="bg-black/20 border-white/10"
                        />
                        <p className="text-[10px] text-slate-500">
                            Use names from{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/si/"
                                target="_blank"
                                className="text-blue-400 underline"
                            >
                                Simple Icons
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/hi2/"
                                target="_blank"
                                className="text-blue-400 underline"
                            >
                                HeroIcons 2
                            </a>
                            .
                        </p>
                    </div>
                    {/* Preview Icon */}
                    {formData.icon && (
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                            <span className="text-xs text-slate-400">
                                Preview:
                            </span>
                            <TechIcon
                                name={formData.icon}
                                className="w-6 h-6 text-white"
                            />
                        </div>
                    )}
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
