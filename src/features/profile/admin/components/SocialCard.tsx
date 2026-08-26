import { useFormContext, useFieldArray } from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPlus, HiTrash} from "react-icons/hi2";

export default function SocialCard() {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "socials",
    });

    const handleAddSocial = () => {
        append({ platform: "", url: "" });
    };

    return (
        <Card className="bg-admin-card/50 border-admin-border/50 text-foreground shadow-lg">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <CardTitle className="font-heading">
                        Social Presence
                    </CardTitle>
                    <CardDescription>
                        Links to your professional networks.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={handleAddSocial}
                    className="w-full sm:w-auto"
                >
                    <HiPlus className="w-4 h-4 mr-2" /> Add Platform
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, idx) => (
                    <div key={field.id} className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-end p-3 sm:p-0 bg-white/5 sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0 border-border/30">
                        <div className="w-full sm:w-1/3 sm:max-w-[200px]">
                            {/* Input untuk Platform */}
                            <Input
                                placeholder="Platform (e.g., github)"
                                {...register(`socials.${idx}.platform` as const)}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            {/* Input untuk URL */}
                            <Input
                                placeholder="https://..."
                                {...register(`socials.${idx}.url` as const)}
                            />
                        </div>
                        <div className="flex justify-end sm:block">
                            <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => remove(idx)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                aria-label="Remove social platform"
                            >
                                <HiTrash className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {fields.length === 0 && (
                    <div
                        className="text-center py-8 text-accent/50 border border-dashed border-admin-border rounded-lg">
                        No social links added yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
