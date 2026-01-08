import { useEffect, useState, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { CgSpinner } from "react-icons/cg";
import {
    HiPlus,
    HiTrash,
    HiOutlineCloud,
    HiPencil,
} from "react-icons/hi2";
import { useProfile } from "@/hooks/useProfile";
import apiClient from "@/api/axios";

// Type Definition matching DB
interface UserProfile {
    name: string;
    headline: string;
    role: string;
    location: string;
    bio_short: string;
    bio_long: string;
    is_hireable: boolean;
    avatar: string | null;
    cv_files: string | null;
    socials: { [key: string]: string }; // Object: { "github": "url", "linkedin": "url" }
    hero_image_codes: string[];
}

export default function ProfileForm() {
    const { data: profileData, isLoading } = useProfile();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initial Form State
    const [formData, setFormData] = useState<UserProfile>({
        name: "",
        headline: "",
        role: "",
        location: "",
        bio_short: "",
        bio_long: "",
        is_hireable: false,
        avatar: "",
        cv_files: "",
        socials: {},
        hero_image_codes: [],
    });

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);

    // Sync state with fetched data
    useEffect(() => {
        if (profileData) {
            setFormData({
                ...profileData,
                socials: profileData.socials || {},
                hero_image_codes: profileData.hero_image_codes || [],
                is_hireable: Boolean(profileData.is_hireable),
            });
        }
    }, [profileData]);

    // --- HANDLERS ---

    // Socials: Add new empty key
    const addSocial = () => {
        // Prevent adding if there's already an empty key to avoid confusion
        if (formData.socials[""]) return;
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, "": "" },
        }));
    };

    // Socials: Remove key
    const removeSocial = (keyToRemove: string) => {
        setFormData((prev) => {
            const newSocials = { ...prev.socials };
            delete newSocials[keyToRemove];
            return { ...prev, socials: newSocials };
        });
    };

    // Socials: Update Key (Platform Name)
    // This is tricky because we need to replace the key in the object
    const updateSocialPlatform = (oldKey: string, newKey: string) => {
        setFormData((prev) => {
            const newSocials: { [key: string]: string } = {};
            Object.keys(prev.socials).forEach((k) => {
                if (k === oldKey) {
                    newSocials[newKey] = prev.socials[oldKey]; // Transfer value to new key
                } else {
                    newSocials[k] = prev.socials[k]; // Keep others
                }
            });
            return { ...prev, socials: newSocials };
        });
    };

    // Socials: Update Value (URL)
    const updateSocialUrl = (platform: string, url: string) => {
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [platform]: url },
        }));
    };

    // Hero Code Snippets
    const addCodeLine = () => {
        setFormData((prev) => ({
            ...prev,
            hero_image_codes: [...prev.hero_image_codes, ""],
        }));
    };

    const removeCodeLine = (idx: number) => {
        setFormData((prev) => ({
            ...prev,
            hero_image_codes: prev.hero_image_codes.filter((_, i) => i !== idx),
        }));
    };

    const updateCodeLine = (idx: number, value: string) => {
        const newCodes = [...formData.hero_image_codes];
        newCodes[idx] = value;
        setFormData((prev) => ({ ...prev, hero_image_codes: newCodes }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("headline", formData.headline || "");
        payload.append("role", formData.role || "");
        payload.append("location", formData.location || "");
        payload.append("bio_short", formData.bio_short || "");
        payload.append("bio_long", formData.bio_long || "");
        payload.append("is_hireable", formData.is_hireable ? "1" : "0");
        payload.append("socials", JSON.stringify(formData.socials));
        payload.append(
            "hero_image_codes",
            JSON.stringify(formData.hero_image_codes)
        );

        if (avatarFile) payload.append("avatar_file", avatarFile);
        if (cvFile) payload.append("cv_file", cvFile);

        try {
            // Using POST with _method=PUT is a common Laravel trick for FormData with files
            payload.append("_method", "PUT");
            await apiClient.post("/profile", payload);
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading)
        return (
            <div className="p-8 text-white animate-pulse">
                Loading profile data...
            </div>
        );

    return (
        <div className="max-w-5xl mx-auto pb-32 bg-lara-dark min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-white">
                    Edit Profile
                </h2>
                <p className="text-lara-sky/80">
                    Manage your public presence and bio.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* --- CARD 1: IDENTITY --- */}
                <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-heading">
                            Identity & Role
                        </CardTitle>
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
                                    onClick={() =>
                                        avatarInputRef.current?.click()
                                    }
                                >
                                    {avatarFile || formData.avatar ? (
                                        <img
                                            src={
                                                avatarFile
                                                    ? URL.createObjectURL(
                                                          avatarFile
                                                      )
                                                    : `http://127.0.0.1:8000${formData.avatar}`
                                            }
                                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-lara-sky/50">
                                            <span className="text-xs">
                                                Upload
                                            </span>
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
                                        setAvatarFile(
                                            e.target.files?.[0] || null
                                        )
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
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                name: e.target.value,
                                            })
                                        }
                                        className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-lara-sky/90">
                                        Headline
                                    </Label>
                                    <Input
                                        value={formData.headline}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                headline: e.target.value,
                                            })
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
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                role: e.target.value,
                                            })
                                        }
                                        className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-lara-sky/90">
                                        Location
                                    </Label>
                                    <Input
                                        value={formData.location}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                location: e.target.value,
                                            })
                                        }
                                        className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* --- CARD 2: BIO & CV --- */}
                <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-heading">
                            About You
                        </CardTitle>
                        <CardDescription>
                            Short introduction and your resume.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label className="text-lara-sky/90">
                                    Short Bio (Home Page)
                                </Label>
                                <Textarea
                                    value={formData.bio_short}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio_short: e.target.value,
                                        })
                                    }
                                    className="bg-field-bg-lara-admin border-card-border-lara-admin min-h-[80px] focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-lara-sky/90">
                                    Full Biography (About Page - Markdown)
                                </Label>
                                <Textarea
                                    value={formData.bio_long}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bio_long: e.target.value,
                                        })
                                    }
                                    className="bg-field-bg-lara-admin border-card-border-lara-admin min-h-[200px] font-mono text-sm focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                />
                            </div>
                        </div>

                        {/* Status & CV Row */}
                        <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-white/10">
                            <div className="flex-1 flex items-center justify-between p-4 rounded-lg bg-field-bg-lara-admin border border-card-border-lara-admin">
                                <div>
                                    <Label className="text-base text-lara-sky/90">
                                        Open to Work?
                                    </Label>
                                    <p className="text-xs text-lara-sky/60 mt-1">
                                        Shows a "Hire Me" badge on your profile.
                                    </p>
                                </div>
                                <Switch
                                    checked={formData.is_hireable}
                                    onCheckedChange={(val) =>
                                        setFormData({
                                            ...formData,
                                            is_hireable: val,
                                        })
                                    }
                                    className="data-[state=checked]:bg-cat-testing"
                                />
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-lara-sky/90">
                                    Resume / CV (PDF)
                                </Label>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() =>
                                            cvInputRef.current?.click()
                                        }
                                        className="bg-white/5 border-white/10 hover:bg-white/10 text-lara-blue"
                                    >
                                        {/* <HiOutlineCloud className="mr-2 h-4 w-4" />  */}
                                        {cvFile ? "Change File" : "Select PDF"}
                                    </Button>
                                    <span className="text-xs text-lara-sky/60 truncate max-w-[200px]">
                                        {cvFile
                                            ? cvFile.name
                                            : formData.cv_files
                                            ? formData.cv_files.split("/").pop()
                                            : "No file uploaded"}
                                    </span>
                                    <input
                                        type="file"
                                        ref={cvInputRef}
                                        className="hidden"
                                        accept=".pdf"
                                        onChange={(e) =>
                                            setCvFile(
                                                e.target.files?.[0] || null
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* --- CARD 3: SOCIAL MEDIA --- */}
                <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
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
                            onClick={() => addSocial()}
                            className="gap-2 text-lara-blue hover:bg-lara-blue/10"
                        >
                            <HiPlus className="w-4 h-4" /> Add Platform
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Object.entries(formData.socials).map(
                            ([platform, url], idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-3 items-center group"
                                >
                                    {/* Platform Key Input */}
                                    <div className="w-1/3 max-w-[200px]">
                                        <Input
                                            placeholder="Platform (e.g. twitter)"
                                            value={platform}
                                            // When key changes, we create new key-value pair and delete old one
                                            onChange={(e) =>
                                                updateSocialPlatform(
                                                    platform,
                                                    e.target.value
                                                )
                                            }
                                            className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                        />
                                    </div>
                                    {/* URL Value Input */}
                                    <div className="flex-1">
                                        <Input
                                            placeholder="https://..."
                                            value={url}
                                            onChange={(e) =>
                                                updateSocialUrl(
                                                    platform,
                                                    e.target.value
                                                )
                                            }
                                            className="bg-field-bg-lara-admin border-card-border-lara-admin focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeSocial(platform)}
                                        className="text-lara-sky/60 hover:text-cat-framework hover:bg-cat-framework/10"
                                    >
                                        <HiTrash className="w-4 h-4" />
                                    </Button>
                                </div>
                            )
                        )}
                        {Object.keys(formData.socials).length === 0 && (
                            <div className="text-center py-8 text-lara-sky/50 border border-dashed border-white/10 rounded-lg">
                                No social links added yet.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* --- CARD 4: HERO CODE --- */}
                <Card className="bg-card-bg-lara-admin border-card-border-lara-admin text-white shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-heading">
                                Hero Code Animation
                            </CardTitle>
                            <CardDescription>
                                Lines of code displayed on the home page
                                typewriter effect.
                            </CardDescription>
                        </div>
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={addCodeLine}
                            className="gap-2"
                        >
                            <HiPlus className="w-4 h-4" /> Add Line
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {formData.hero_image_codes.map((line, idx) => (
                            <div key={idx} className="flex gap-3 items-center">
                                <span className="text-lara-sky/40 font-mono text-xs w-6 text-right select-none">
                                    {idx + 1}
                                </span>
                                <Input
                                    value={line}
                                    onChange={(e) =>
                                        updateCodeLine(idx, e.target.value)
                                    }
                                    className="bg-field-bg-lara-admin border-card-border-lara-admin text-cat-technique font-mono text-sm border-l-2 border-l-lara-blue/30 rounded-none focus-visible:ring-lara-blue placeholder-lara-sky/30"
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeCodeLine(idx)}
                                    className="text-lara-sky/60 hover:text-cat-framework hover:bg-cat-framework/10"
                                >
                                    <HiTrash className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* --- FLOATING ACTION BAR --- */}
                <div className="fixed bottom-6 right-8 z-50">
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-lara-blue hover:bg-blue-600 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all hover:scale-105"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <CgSpinner className="animate-spin mr-2 h-5 w-5" />
                        ) : null}
                        {isSubmitting ? "Saving..." : "Save All Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
