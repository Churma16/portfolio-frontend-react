import { useEffect, useState, FormEvent } from "react";
import { useProfile } from "@/hooks/useProfile";
import apiClient from "@/api/axios";
import IdentityCard from "./IdentityCard";
import BioCard from "./BioCard";
import SocialCard from "./SocialCard";
import HeroCodeCard from "./HeroCodeCard";
import SaveButton from "./SaveButton";

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
    socials: { [key: string]: string };
    hero_image_codes: string[];
}

export default function ProfileForm() {
    const { data: profileData, isLoading } = useProfile();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
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

    // --- HANDLERS: Identity Card ---
    const handleNameChange = (value: string) => {
        setFormData({ ...formData, name: value });
    };

    const handleHeadlineChange = (value: string) => {
        setFormData({ ...formData, headline: value });
    };

    const handleRoleChange = (value: string) => {
        setFormData({ ...formData, role: value });
    };

    const handleLocationChange = (value: string) => {
        setFormData({ ...formData, location: value });
    };

    const handleAvatarChange = (file: File | null) => {
        setAvatarFile(file);
    };

    // --- HANDLERS: Bio Card ---
    const handleBioShortChange = (value: string) => {
        setFormData({ ...formData, bio_short: value });
    };

    const handleBioLongChange = (value: string) => {
        setFormData({ ...formData, bio_long: value });
    };

    const handleHireableChange = (value: boolean) => {
        setFormData({ ...formData, is_hireable: value });
    };

    const handleCvFileChange = (file: File | null) => {
        setCvFile(file);
    };

    // --- HANDLERS: Social Card ---
    const addSocial = () => {
        if (formData.socials[""]) return;
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, "": "" },
        }));
    };

    const removeSocial = (keyToRemove: string) => {
        setFormData((prev) => {
            const newSocials = { ...prev.socials };
            delete newSocials[keyToRemove];
            return { ...prev, socials: newSocials };
        });
    };

    const updateSocialPlatform = (oldKey: string, newKey: string) => {
        setFormData((prev) => {
            const newSocials: { [key: string]: string } = {};
            Object.keys(prev.socials).forEach((k) => {
                if (k === oldKey) {
                    newSocials[newKey] = prev.socials[oldKey];
                } else {
                    newSocials[k] = prev.socials[k];
                }
            });
            return { ...prev, socials: newSocials };
        });
    };

    const updateSocialUrl = (platform: string, url: string) => {
        setFormData((prev) => ({
            ...prev,
            socials: { ...prev.socials, [platform]: url },
        }));
    };

    // --- HANDLERS: Hero Code Card ---
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

    // --- FORM SUBMISSION ---
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
                {/* Card 1: Identity & Role */}
                <IdentityCard
                    formData={{
                        name: formData.name,
                        headline: formData.headline,
                        role: formData.role,
                        location: formData.location,
                        avatar: formData.avatar,
                    }}
                    avatarFile={avatarFile}
                    onNameChange={handleNameChange}
                    onHeadlineChange={handleHeadlineChange}
                    onRoleChange={handleRoleChange}
                    onLocationChange={handleLocationChange}
                    onAvatarChange={handleAvatarChange}
                />
    
                {/* Card 2: Bio & CV */}
                <BioCard
                    formData={{
                        bio_short: formData.bio_short,
                        bio_long: formData.bio_long,
                        is_hireable: formData.is_hireable,
                        cv_files: formData.cv_files,
                    }}
                    cvFile={cvFile}
                    onBioShortChange={handleBioShortChange}
                    onBioLongChange={handleBioLongChange}
                    onHireableChange={handleHireableChange}
                    onCvFileChange={handleCvFileChange}
                />

                {/* Card 3: Social Media */}
                <SocialCard
                    socials={formData.socials}
                    onAddSocial={addSocial}
                    onRemoveSocial={removeSocial}
                    onUpdatePlatform={updateSocialPlatform}
                    onUpdateUrl={updateSocialUrl}
                />

                {/* Card 4: Hero Code */}
                <HeroCodeCard
                    codes={formData.hero_image_codes}
                    onAddLine={addCodeLine}
                    onRemoveLine={removeCodeLine}
                    onUpdateLine={updateCodeLine}
                />

                {/* Floating Save Button */}
                <SaveButton isSubmitting={isSubmitting} />
            </form>
        </div>
    );
}
