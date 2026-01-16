import {useFieldArray, useFormContext} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPlus, HiTrash} from "react-icons/hi2";
import {ProfileFormValues} from "../index.tsx"; // Import tipe jika perlu

export default function SocialCard() {
    const { control, register } = useFormContext<ProfileFormValues>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "socialsArray",
    });

    return (
        <Card className="bg-admin-card border-admin-border text-foreground shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
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
                    onClick={() => append({ platform: "", url: "" })}
                >
                    <HiPlus className="w-4 h-4 mr-2" /> Add Platform
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, idx) => (
                    <div key={field.id} className="flex gap-3 items-center">
                        <div className="w-1/3 max-w-[200px]">
                            {/* Input untuk Key (Platform) */}
                            <Input
                                placeholder="Platform"
                                {...register(`socialsArray.${idx}.platform`)}
                                className="bg-admin-field"
                            />
                        </div>
                        <div className="flex-1">
                            {/* Input untuk Value (URL) */}
                            <Input
                                placeholder="https://..."
                                {...register(`socialsArray.${idx}.url`)}
                                className="bg-admin-field"
                            />
                        </div>
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => remove(idx)}
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
                {fields.length === 0 && (
                    <div className="text-center py-8 text-accent/50 border border-dashed border-white/10 rounded-lg">
                        No social links added yet.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
