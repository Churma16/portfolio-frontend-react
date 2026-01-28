import {FormEvent, useEffect, useState} from "react";
import {useProfile, useUpdateProfile} from "@/features/profile/hooks/useProfile.ts";
import {useApi} from "@/contexts/useApi.ts";
import {useStoragePath} from "@/hooks/useStoragePath.ts";
import {useThumbnailUpload} from "@/hooks/useThumbnailUpload.ts";

// ============================================================================
// Types
// ============================================================================

interface UseProfileFormProps {
    open: boolean;
    onSuccess: () => void;
    onClose: () => void;
}

interface ProfileFormData {
    name: string;
    headline: string;
    role: string;
    location: string;
    bio_short: string;
    bio_long: string;
    is_hireable: boolean;
    socials: string; // JSON string
    hero_image_codes: string; // JSON string
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Clean text: trim & remove extra whitespace
 */
const cleanText = (text: string): string =>
    text.trim().replace(/\s+/g, " ");

/**
 * Transform form socials array → DB object format
 * Form: [{ platform: 'twitter', url: 'url1' }]
 * DB: { twitter: 'url1' }
 */
const transformSocialsToDb = (socialsArray: Array<{ platform: string; url: string }>): string => {
    const socialsObj = socialsArray.reduce((acc, curr) => {
        if (curr.platform && curr.url) {
            acc[curr.platform] = curr.url;
        }
        return acc;
    }, {} as Record<string, string>);
    return JSON.stringify(socialsObj);
};

/**
 * Transform form hero codes → DB array format
 * Form: [{ value: 'code1' }, { value: 'code2' }]
 * DB: ["code1", "code2"]
 */
const transformHeroCodesToDb = (heroCodes: Array<{ value: string }>): string => {
    const codesArray = heroCodes.map((c) => c.value.trim()).filter((val) => val !== "");
    return JSON.stringify(codesArray);
};

/**
 * Transform DB socials object → form array format
 * DB: { twitter: 'url1' }
 * Form: [{ platform: 'twitter', url: 'url1' }]
 */
const transformSocialsFromDb = (socials: any): Array<{ platform: string; url: string }> => {
    if (!socials || typeof socials !== "object") return [];
    return Object.entries(socials).map(([platform, url]) => ({
        platform,
        url: url as string,
    }));
};

/**
 * Transform DB hero codes string → form array format
 * DB: "[\"code1\", \"code2\"]" or ["code1", "code2"]
 * Form: [{ value: 'code1' }, { value: 'code2' }]
 */
const transformHeroCodesFromDb = (heroCodes: any): Array<{ value: string }> => {
    let parsedCodes: string[] = [];

    if (typeof heroCodes === "string") {
        try {
            parsedCodes = JSON.parse(heroCodes);
        } catch {
            parsedCodes = [];
        }
    } else if (Array.isArray(heroCodes)) {
        parsedCodes = heroCodes;
    }

    return parsedCodes.map((code: string) => ({value: code}));
};

// ============================================================================
// Hook
// ============================================================================

export const useProfileForm = ({
                                   open,
                                   onSuccess,
                                   onClose,
                               }: UseProfileFormProps) => {
    const {activeBackend} = useApi();
    const StoragePath = useStoragePath();
    const {data: profileData, isLoading} = useProfile();
    const updateMutation = useUpdateProfile();

    // --- Avatar Upload Hook ---
    const {
        thumbnailFile: avatarFile,
        thumbnailPreview: avatarPreview,
        handleThumbnailChange: handleAvatarChange,
        resetThumbnail: resetAvatar,
        setThumbnailFile: setAvatarFile,
        setThumbnailPreview: setAvatarPreview,
    } = useThumbnailUpload();

    // --- CV Upload State ---
    const [cvFile, setCvFile] = useState<File | null>(null);

    // --- Form Data State ---
    const [formData, setFormData] = useState<ProfileFormData>({
        name: "",
        headline: "",
        role: "",
        location: "",
        bio_short: "",
        bio_long: "",
        is_hireable: false,
        socials: "{}",
        hero_image_codes: "[]",
    });

    const [socialsArray, setSocialsArray] = useState<Array<{ platform: string; url: string }>>([]);
    const [heroCodesArray, setHeroCodesArray] = useState<Array<{ value: string }>>([]);

    const isSubmitting = updateMutation.isPending;

    // --- Helper Functions ---
    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            headline: "",
            role: "",
            location: "",
            bio_short: "",
            bio_long: "",
            is_hireable: false,
            socials: "{}",
            hero_image_codes: "[]",
        });
        resetAvatar();
        setCvFile(null);
        setSocialsArray([]);
        setHeroCodesArray([]);
    };

    // --- Effects ---
    useEffect(() => {
        if (!open) return;

        setTimeout(() => {
            if (profileData) {
                const socialsFromDb = transformSocialsFromDb(profileData.socials);
                const heroCodesFromDb = transformHeroCodesFromDb(profileData.hero_image_codes);

                setFormData({
                    name: profileData.name,
                    headline: profileData.headline,
                    role: profileData.role,
                    location: profileData.location,
                    bio_short: profileData.bio_short,
                    bio_long: profileData.bio_long,
                    is_hireable: Boolean(profileData.is_hireable),
                    socials: JSON.stringify(profileData.socials || {}),
                    hero_image_codes: JSON.stringify(profileData.hero_image_codes || []),
                });

                setSocialsArray(socialsFromDb);
                setHeroCodesArray(heroCodesFromDb);
                setAvatarPreview(profileData.avatar ? `${StoragePath}${profileData.avatar}` : "");
                setAvatarFile(null);
                setCvFile(null);
            } else {
                resetForm();
            }
        }, 0);
    }, [open, profileData]);

    // --- Submit Handler ---
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!profileData?.id) {
            alert("Profile ID not found");
            return;
        }

        const basePayload: any = {
            name: formData.name.trim(),
            headline: cleanText(formData.headline) || "",
            role: formData.role.trim() || "",
            location: formData.location.trim() || "",
            bio_short: cleanText(formData.bio_short) || "",
            bio_long: cleanText(formData.bio_long) || "",
            is_hireable: formData.is_hireable ? "1" : "0",
            socials: transformSocialsToDb(socialsArray),
            hero_image_codes: transformHeroCodesToDb(heroCodesArray),
        };

        // Always use FormData for updates to ensure multipart/form-data content-type
        const formDataPayload = new FormData();

        // Add all form fields
        Object.entries(basePayload).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                return;
            }

            if (Array.isArray(value)) {
                formDataPayload.append(key, JSON.stringify(value));
            } else if (value instanceof File) {
                formDataPayload.append(key, value);
            } else {
                formDataPayload.append(key, String(value));
            }
        });

        // Add avatar if file is selected
        if (avatarFile) {
            formDataPayload.append('avatar', avatarFile);
        }

        // Add cv if file is selected
        if (cvFile) {
            formDataPayload.append('cv_files', cvFile);
        }

        // For Laravel, add _method field
        if (activeBackend === "laravel") {
            formDataPayload.append('_method', 'PUT');
        }

        console.log("📝 Profile Payload:", {
            hasAvatarFile: !!avatarFile,
            hasCvFile: !!cvFile,
            activeBackend,
            formDataEntries: Array.from(formDataPayload.entries()).map(([k, v]) => [k, v instanceof File ? `[File: ${(v as File).name}]` : v]),
        });

        updateMutation.mutate(
            {id: profileData.id, data: formDataPayload},
            {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                    alert("Profile Updated!");
                },
                onError: (err: any) => {
                    console.error("Error submitting profile:", err);
                    alert("Failed to save profile. Please try again.");
                },
            }
        );
    };

    // --- Return ---
    return {
        isLoading,
        isSubmitting,
        formData,
        handleInputChange,
        avatarPreview,
        handleAvatarChange,
        cvFile,
        setCvFile,
        socialsArray,
        setSocialsArray,
        heroCodesArray,
        setHeroCodesArray,
        handleSubmit,
    };
};
