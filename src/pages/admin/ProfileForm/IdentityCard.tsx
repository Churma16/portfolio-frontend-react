import { useRef } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HiPencil } from "react-icons/hi2";

interface IdentityCardProps {
    formData: {
        name: string;
        headline: string;
        role: string;
        location: string;
        avatar: string | null;
    };
    avatarFile: File | null;
    onNameChange: (value: string) => void;
    onHeadlineChange: (value: string) => void;
    onRoleChange: (value: string) => void;
    onLocationChange: (value: string) => void;
    onAvatarChange: (file: File | null) => void;
}

export default function IdentityCard({
    formData,
    avatarFile,
    onNameChange,
    onHeadlineChange,
    onRoleChange,
    onLocationChange,
    onAvatarChange,
}: IdentityCardProps) {
    const avatarInputRef = useRef<HTMLInputElement>(null);

    return (
        <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
            <CardHeader>
                <CardTitle className="font-heading">Identity & Role</CardTitle>
                <CardDescription>
                    Your main avatar and professional title.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center space-y-3">
                        <div
                            className="relative group w-32 h-32 rounded-full bg-lara-dark border-2 border-dashed border-lara-blue/30 overflow-hidden cursor-pointer hover:border-lara-blue transition-all"
                            onClick={() => avatarInputRef.current?.click()}
                        >
                            {avatarFile || formData.avatar ? (
                                <img
                                    src={
                                        avatarFile
                                            ? URL.createObjectURL(avatarFile)
                                            : `http://127.0.0.1:8000${formData.avatar}`
                                    }
                                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                    alt="Avatar"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lara-sky/50">
                                    <span className="text-xs">Upload</span>
                                </div>
                            )}

                            {/* Overlay Icon */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <HiPencil className="w-6 h-6 text-lara-blue" />
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={avatarInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={(e) =>
                                onAvatarChange(e.target.files?.[0] || null)
                            }
                        />
                        <span className="text-xs text-lara-sky/50">
                            Click to change
                        </span>
                    </div>

                    {/* Inputs Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                        <div className="space-y-2">
                            <Label className="text-lara-sky/90">
                                Full Name
                            </Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => onNameChange(e.target.value)}
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-lara-sky/90">Headline</Label>
                            <Input
                                value={formData.headline}
                                onChange={(e) =>
                                    onHeadlineChange(e.target.value)
                                }
                                placeholder="e.g. Software Engineer at Google"
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-lara-sky/90">
                                Current Role
                            </Label>
                            <Input
                                value={formData.role}
                                onChange={(e) => onRoleChange(e.target.value)}
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-lara-sky/90">Location</Label>
                            <Input
                                value={formData.location}
                                onChange={(e) =>
                                    onLocationChange(e.target.value)
                                }
                                className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
