import { useEffect, useState, FormEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CgSpinner } from "react-icons/cg";
import { HiPlus, HiTrash, HiOutlineCloudUpload } from "react-icons/hi2";
import { useProfile } from "@/hooks/useProfile";
import apiClient from "@/api/axios";

// Type Definition sesuai DB
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
    socials: { [key: string]: string }; // Object with platform names as keys
    hero_image_codes: string[];
}

export default function ProfileForm() {
    const { data: profileData, isLoading } = useProfile();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State Form Utama
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

    // State untuk File Upload (Terpisah karena bentuknya File object)
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);

    // Ref untuk input file hidden
    const avatarInputRef = useRef<HTMLInputElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);

    // Update form ketika profileData berubah
    useEffect(() => {
        if (profileData) {
            setFormData({
                ...profileData,
                socials: profileData.socials || [],
                hero_image_codes: profileData.hero_image_codes || [],
                is_hireable: Boolean(profileData.is_hireable),
            });
        }
    }, [profileData]);

    // SOCIALS
    const addSocial = (platform: string = "") => {
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [platform]: "" },
        }));
    };
    const removeSocial = (platform: string) => {
        setFormData((prev) => {
            const newSocials = { ...prev.socials };
            delete newSocials[platform];
            return { ...prev, socials: newSocials };
        });
    };
    const updateSocial = (platform: string, url: string) => {
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [platform]: url },
        }));
    };

    // HERO IMAGE CODES (Code Snippets)
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

    // 3. Handle Submit
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = new FormData();

        // Append Text Fields
        payload.append("name", formData.name);
        payload.append("headline", formData.headline || "");
        payload.append("role", formData.role || "");
        payload.append("location", formData.location || "");
        payload.append("bio_short", formData.bio_short || "");
        payload.append("bio_long", formData.bio_long || "");
        payload.append("is_hireable", formData.is_hireable ? "1" : "0");

        // Append JSON Fields (Stringify dulu)
        payload.append("socials", JSON.stringify(formData.socials));
        payload.append(
            "hero_image_codes",
            JSON.stringify(formData.hero_image_codes)
        );

        // Append Files (Hanya jika ada file baru dipilih)
        if (avatarFile) payload.append("avatar_file", avatarFile);
        if (cvFile) payload.append("cv_file", cvFile);

        try {
            await apiClient.post("/profile", payload);
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="text-white">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <h2 className="text-3xl font-bold text-white">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* CARD 1: BASIC INFO */}
                <Card className="bg-[#0f172a] border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex gap-6 items-start">
                            {/* Avatar Upload */}
                            <div className="shrink-0 space-y-2 text-center">
                                <div
                                    className="w-24 h-24 rounded-full bg-slate-800 border-2 border-white/10 overflow-hidden cursor-pointer hover:border-lara-blue transition-colors"
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
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                                            No Img
                                        </div>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                    onClick={() =>
                                        avatarInputRef.current?.click()
                                    }
                                >
                                    Change Avatar
                                </Button>
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
                            </div>

                            {/* Inputs */}
                            <div className="flex-1 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    name: e.target.value,
                                                })
                                            }
                                            className="bg-black/20 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Headline</Label>
                                        <Input
                                            value={formData.headline}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    headline: e.target.value,
                                                })
                                            }
                                            placeholder="e.g. Fullstack Developer"
                                            className="bg-black/20 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Current Role</Label>
                                        <Input
                                            value={formData.role}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    role: e.target.value,
                                                })
                                            }
                                            className="bg-black/20 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={formData.location}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    location: e.target.value,
                                                })
                                            }
                                            className="bg-black/20 border-white/10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CARD 2: BIO & STATUS */}
                <Card className="bg-[#0f172a] border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Biography & Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Short Bio</Label>
                            <Textarea
                                value={formData.bio_short}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio_short: e.target.value,
                                    })
                                }
                                className="bg-black/20 border-white/10"
                                rows={2}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Long Bio (Markdown Support)</Label>
                            <Textarea
                                value={formData.bio_long}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio_long: e.target.value,
                                    })
                                }
                                className="bg-black/20 border-white/10"
                                rows={6}
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-white/10 rounded-lg bg-white/5">
                            <div className="space-y-0.5">
                                <Label>Open to Work?</Label>
                                <p className="text-sm text-slate-400">
                                    Set your status as hireable.
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
                            />
                        </div>

                        {/* CV Upload */}
                        <div className="space-y-2">
                            <Label>Upload CV (PDF)</Label>
                            <div className="flex gap-4 items-center">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => cvInputRef.current?.click()}
                                >
                                    {/* <HiOutlineCloudUpload className="mr-2" />{" "} */}
                                    Select File
                                </Button>
                                <span className="text-sm text-slate-400">
                                    {cvFile
                                        ? cvFile.name
                                        : formData.cv_files
                                        ? "Current: " +
                                          formData.cv_files.split("/").pop()
                                        : "No file selected"}
                                </span>
                                <input
                                    type="file"
                                    ref={cvInputRef}
                                    className="hidden"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setCvFile(e.target.files?.[0] || null)
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* CARD 3: SOCIAL MEDIA (Dynamic JSON) */}
                <Card className="bg-[#0f172a] border-white/10 text-white">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>Social Media Links</CardTitle>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => addSocial("twitter")}
                            >
                                <HiPlus /> Add
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.entries(formData.socials).map(
                            ([platform, url]) => (
                                <div key={platform} className="flex gap-2">
                                    <Input
                                        placeholder="Platform (e.g. GitHub)"
                                        value={platform}
                                        disabled
                                        className="bg-black/40 border-white/10 w-1/3"
                                    />
                                    <Input
                                        placeholder="URL"
                                        value={url}
                                        onChange={(e) =>
                                            updateSocial(
                                                platform,
                                                e.target.value
                                            )
                                        }
                                        className="bg-black/20 border-white/10 flex-1"
                                    />
                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => removeSocial(platform)}
                                    >
                                        <HiTrash />
                                    </Button>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>

                {/* CARD 4: HERO CODE SNIPPET (Dynamic JSON) */}
                <Card className="bg-[#0f172a] border-white/10 text-white">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle>Hero Code Snippet</CardTitle>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={addCodeLine}
                            >
                                <HiPlus /> Add Line
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2 font-mono text-sm">
                        {formData.hero_image_codes.map((line, idx) => (
                            <div key={idx} className="flex gap-2">
                                <span className="text-slate-500 py-2 select-none">
                                    {idx + 1}.
                                </span>
                                <Input
                                    value={line}
                                    onChange={(e) =>
                                        updateCodeLine(idx, e.target.value)
                                    }
                                    className="bg-black/40 border-white/10 text-green-400 font-mono"
                                />
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => removeCodeLine(idx)}
                                >
                                    <HiTrash className="text-slate-500 hover:text-red-400" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* SUBMIT BUTTON */}
                <div className="fixed bottom-0 left-64 right-0 p-4 bg-[#050914]/80 backdrop-blur border-t border-white/10 flex justify-end">
                    <Button
                        type="submit"
                        size="lg"
                        className="bg-lara-blue hover:bg-blue-600 min-w-[150px]"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <CgSpinner className="animate-spin mr-2" />
                        ) : null}
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}
