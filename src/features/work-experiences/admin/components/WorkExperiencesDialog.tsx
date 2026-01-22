import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Label} from "@/components/ui/label.tsx";
import {CgSpinner} from "react-icons/cg";
import {WorkExperience} from "@/types";

// Hooks & Components
import {useTechStacks} from "@/features/tech-stacks/hooks/useTechStacks.ts";
import {useTags} from "@/features/tags/hooks/useTags.ts";
import {useWorkExperienceForm} from "@/features/projects/hooks/UseWorkExperienceForm.ts";
import {TagSelector, TechStackSelector} from "@/features/projects/admin/components/WorkExperienceSelectors.tsx";

interface WorkExperiencesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    experienceToEdit?: WorkExperience | null;
    onSuccess: () => void;
}

export default function WorkExperiencesDialog({
                                                  open,
                                                  onOpenChange,
                                                  experienceToEdit,
                                                  onSuccess,
                                              }: WorkExperiencesDialogProps) {
    // 1. Fetch Master Data (Mata-mata eksternal)
    const {data: availableStacks = []} = useTechStacks();
    const {data: availableTags = []} = useTags();

    // 2. Init Logic Form (Strategist)
    const {
        formData,
        handleInputChange,
        selectedStackIds,
        toggleStack,
        selectedTagIds,
        toggleTag,
        handleSubmit,
        isSubmitting
    } = useWorkExperienceForm({
        experienceToEdit,
        open,
        onSuccess,
        onClose: () => onOpenChange(false),
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-3xl w-[95vw] bg-admin-card border border-white/10 text-foreground max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{experienceToEdit ? "Edit Work Experience" : "Add New Work Experience"}</DialogTitle>
                    <DialogDescription>Fill in the details below.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    {/* Row 1: Company & Position */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                value={formData.company}
                                onChange={(e) => handleInputChange("company", e.target.value)}
                                placeholder="E.g. Tech Company Inc."
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Position</Label>
                            <Input
                                value={formData.position}
                                onChange={(e) => handleInputChange("position", e.target.value)}
                                placeholder="E.g. Senior Developer"
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Location & Current */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2 flex items-end">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_current}
                                    onChange={(e) => handleInputChange("is_current", e.target.checked)}
                                    className="w-4 h-4 rounded border-white/10 bg-black/20 text-primary"
                                />
                                <span className="text-sm text-lara-text-tertiary">Currently Working Here</span>
                            </label>
                        </div>
                    </div>

                    {/* Row 3: Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Date</Label>
                            <Input
                                type="month"
                                value={formData.start_date}
                                onChange={(e) => handleInputChange("start_date", e.target.value)}
                                className="bg-black/20 border-white/10"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>End Date</Label>
                            <Input
                                type="month"
                                value={formData.end_date}
                                onChange={(e) => handleInputChange("end_date", e.target.value)}
                                className="bg-black/20 border-white/10"
                                disabled={formData.is_current}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            className="bg-black/20 border-white/10"
                            rows={4}
                            required
                        />
                    </div>

                    {/* --- THE SPECIALISTS --- */}
                    <TechStackSelector
                        options={availableStacks}
                        selectedIds={selectedStackIds}
                        onToggle={toggleStack}
                    />

                    <TagSelector
                        options={availableTags}
                        selectedIds={selectedTagIds}
                        onToggle={toggleTag}
                    />

                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" className="bg-primary hover:bg-blue-600 min-w-[120px]"
                                disabled={isSubmitting}>
                            {isSubmitting ? <CgSpinner className="animate-spin mr-2"/> : null}
                            {experienceToEdit ? "Update Experience" : "Create Experience"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}