import {FormEvent, useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useProfile} from "@/features/profile/hooks/useProfile.ts";
import {useApi} from "@/contexts/useApi.ts";
import {useStoragePath} from "@/hooks/useStoragePath.ts";
import {useThumbnailUpload} from "@/hooks/useThumbnailUpload.ts";
import apiClient from "@/api/axios.ts";

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
    const queryClient = useQueryClient();
    const StoragePath = useStoragePath();
    const {data: profileData, isLoading} = useProfile();

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

    // --- Mutation ---
    const mutation = useMutation({
        mutationFn: async (data: any) => {
            if (!profileData?.id) {
                throw new Error("Profile ID not found");
            }

            const payload: any = {
                name: data.name.trim(),
                headline: cleanText(data.headline) || "",
                role: data.role.trim() || "",
                location: data.location.trim() || "",
                bio_short: cleanText(data.bio_short) || "",
                bio_long: cleanText(data.bio_long) || "",
                is_hireable: data.is_hireable ? "1" : "0",
                socials: data.socials,
                hero_image_codes: data.hero_image_codes,
            };

            // Only include avatar if file is selected
            if (avatarFile) {
                payload.avatar = avatarFile;
            }

            // Only include cv if file is selected
            if (cvFile) {
                payload.cv_files = cvFile;
            }

            // For Laravel PUT requests with FormData, add _method field
            if (activeBackend === "laravel") {
                payload._method = "PUT";
            }

            console.log("📝 Profile Payload:", {
                hasAvatarFile: !!avatarFile,
                hasCvFile: !!cvFile,
                activeBackend,
                ...payload,
            });

            // Use PUT method for updates
            if (activeBackend === "go") {
                return await apiClient.put(`/profiles/${profileData.id}`, payload);
            } else {
                // Laravel requires POST with _method: PUT for FormData
                return await apiClient.post(`/profiles/${profileData.id}`, payload);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile"]});
            onSuccess();
            onClose();
            alert("Profile Updated!");
        },
        onError: (err: any) => {
            console.error("Error submitting profile:", err);
            alert("Failed to save profile. Please try again.");
        },
    });

    const isSubmitting = mutation.isPending;

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

        const payload = {
            ...formData,
            socials: transformSocialsToDb(socialsArray),
            hero_image_codes: transformHeroCodesToDb(heroCodesArray),
        };

        mutation.mutate(payload);
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
