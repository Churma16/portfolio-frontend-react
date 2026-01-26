import {useRef} from "react";
import {useFormContext} from "react-hook-form"; // Import ini
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {HiPencil} from "react-icons/hi2";
import {ProfileFormValues} from "../ProfileDialog.tsx";
import {useStoragePath} from "@/features/projects/hooks/useStoragePath.ts"; // Import tipe jika perlu

export default function IdentityCard() {
    const {register, watch, setValue} = useFormContext<ProfileFormValues>();
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const storagePath = useStoragePath();

    // Watch values untuk preview
    const avatarUrl = watch("avatar");
    const avatarFileList = watch("avatar_file");

    // Logic Preview Image
    const previewImage =
        avatarFileList && avatarFileList.length > 0
            ? URL.createObjectURL(avatarFileList[0])
            : avatarUrl
                ? `${avatarUrl}`
                : null;

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // Manually set FileList ke form state
            setValue("avatar_file", e.target.files);
        }
    };

    return (
        <Card className="bg-admin-card/50 border-lara-border text-foreground shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">Identity & Role</CardTitle>
                <CardDescription>
                    Your main avatar and professional title.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center space-y-3 ">
                        <div
                            className="relative group w-32 h-32 rounded-full bg-background border-2 border-dashed border-primary/30 overflow-hidden cursor-pointer"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            {previewImage ? (
                                <img
                                    src={previewImage.startsWith("blob:") ? previewImage : `${storagePath}${previewImage}`}
                                    className="w-full h-full object-cover"
                                    alt="Avatar"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-accent/50">
                                    Upload
                                </div>
                            )}
                            <div
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                                <HiPencil className="w-6 h-6 text-primary"/>
                            </div>
                        </div>

                        {/* Hidden Input connected to RHF */}
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            ref={(e) => {
                                // Simpan ref lokal untuk click handler
                                avatarInputRef.current = e;
                            }}
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Text Inputs */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                {...register("name")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Headline</Label>
                            <Input
                                {...register("headline")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Role</Label>
                            <Input
                                {...register("role")}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                {...register("location")}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
