import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {HiPencil} from "react-icons/hi2";
import {useStoragePath} from "@/hooks/useStoragePath.ts";

interface IdentityCardProps {
    formData: {
        name: string;
        headline: string;
        role: string;
        location: string;
    };
    handleInputChange: (field: string, value: any) => void;
    avatarPreview: string;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function IdentityCard({
                                         formData,
                                         handleInputChange,
                                         avatarPreview,
                                         handleAvatarChange,
                                     }: IdentityCardProps) {
    const storagePath = useStoragePath();

    return (
        <Card className="bg-admin-card/50 border-lara-border text-foreground shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">Identity & Role</CardTitle>
                <CardDescription>
                    Your main avatar and professional title.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center space-y-3 ">
                        <label
                            className="relative group w-32 h-32 rounded-full bg-background border-2 border-dashed border-primary/30 overflow-hidden cursor-pointer"
                        >
                            {avatarPreview ? (
                                <img
                                    src={avatarPreview}
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

                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>

                    {/* Text Inputs */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Headline</Label>
                            <Input
                                value={formData.headline}
                                onChange={(e) => handleInputChange("headline", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Current Role</Label>
                            <Input
                                value={formData.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) => handleInputChange("location", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
