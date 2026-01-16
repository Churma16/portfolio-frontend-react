import {FormEvent, useEffect, useState} from "react";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {TechStack} from "@/types";
import TechIcon from "@/components/common/TechIcon.tsx";
import apiClient from "@/api/axios.ts";

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
            <DialogContent className="w-[95vw] bg-admin-card border-white/10 text-foreground">
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
                        <p className="text-[10px] text-lara-text-muted-dark">
                            Use names from{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/si/"
                                target="_blank"
                                className="text-lara-accent-blue-light underline"
                            >
                                Simple Icons
                            </a>{" "}
                            or{" "}
                            <a
                                href="https://react-icons.github.io/react-icons/icons/hi2/"
                                target="_blank"
                                className="text-lara-accent-blue-light underline"
                            >
                                HeroIcons 2
                            </a>
                            .
                        </p>
                    </div>
                    {/* Preview Icon */}
                    {formData.icon && (
                        <div className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                            <span className="text-xs text-lara-text-muted-dark">
                                Preview:
                            </span>
                            <TechIcon
                                name={formData.icon}
                                className="w-6 h-6 text-foreground"
                            />
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            type="submit"
                            className="bg-primary"
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
