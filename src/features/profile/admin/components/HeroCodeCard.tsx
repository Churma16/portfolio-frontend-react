import {useFieldArray, useFormContext} from "react-hook-form";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {HiPlus, HiTrash} from "react-icons/hi2";
import {ProfileFormValues} from "../ProfileDialog.tsx"; // Import tipe jika perlu

export default function HeroCodeCard() {
    const { control, register } = useFormContext<ProfileFormValues>();

    // Array Magic di sini
    const { fields, append, remove } = useFieldArray({
        control,
        name: "hero_image_codes", // Sesuai nama field di ProfileFormValues
    });

    return (
        <Card className="bg-admin-card/50 border-lara-border text-foreground shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="font-heading">
                        Hero Code Animation
                    </CardTitle>
                    <CardDescription>
                        Lines of code displayed on home page.
                    </CardDescription>
                </div>
                <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => append({ value: "" })} // Tambah item baru
                >
                    <HiPlus className="w-4 h-4 mr-2" /> Add Line
                </Button>
            </CardHeader>
            <CardContent className="space-y-2">
                {fields.map((field, idx) => (
                    <div key={field.id} className="flex gap-3 items-center">
                        <span className="text-accent/40 font-mono text-xs w-6 text-right">
                            {idx + 1}
                        </span>
                        {/* Register array index yang spesifik */}
                        <Input
                            {...register(`hero_image_codes.${idx}.value`)}
                            className="font-mono text-sm"
                            placeholder="const code = 'hero';"
                        />
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => remove(idx)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            <HiTrash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
