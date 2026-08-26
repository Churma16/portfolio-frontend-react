import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useProfile, useUpdateProfile } from "@/features/profile/hooks/useProfile.ts";
import { useApi } from "@/contexts/useApi.ts";
import { useStoragePath } from "@/hooks/useStoragePath.ts";
import { useThumbnailUpload } from "@/hooks/useThumbnailUpload.ts";
import {
    ProfileFormData,
    UseProfileFormProps,
    normalizeWhitespace,
    deserializeHeroCodesFromDatabase,
    serializeHeroCodesForDatabase,
    deserializeSocialsFromDatabase,
    serializeSocialsForDatabase,
} from "../utils/profileForm.helpers.ts";

import { buildFormData } from "@/lib/formDataUtils.ts";

// ============================================================================
// Hook
// ============================================================================

export const useProfileForm = ({
    open,
    onSuccess,
    onClose,
}: UseProfileFormProps) => {
    const { activeBackend } = useApi();
    const StoragePath = useStoragePath();
    const { data: profileData, isLoading } = useProfile();
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

    // --- React Hook Form ---
    const methods = useForm<ProfileFormData>({
        defaultValues: {
            name: "",
            headline: "",
            role: "",
            location: "",
            bio_short: "",
            bio_long: "",
            is_hireable: false,
            socials: [],
            hero_image_codes: [],
        },
    });

    const { reset, handleSubmit } = methods;
    const isSubmitting = updateMutation.isPending;

    const resetForm = () => {
        reset({
            name: "",
            headline: "",
            role: "",
            location: "",
            bio_short: "",
            bio_long: "",
            is_hireable: false,
            socials: [],
            hero_image_codes: [],
        });
        resetAvatar();
        setCvFile(null);
    };

    // --- Effects ---
    useEffect(() => {
        if (!open) return;

        setTimeout(() => {
            if (profileData) {
                const socialsFromDb = deserializeSocialsFromDatabase(profileData.socials);
                const heroCodesFromDb = deserializeHeroCodesFromDatabase(profileData.hero_image_codes);

                reset({
                    name: profileData.name || "",
                    headline: profileData.headline || "",
                    role: profileData.role || "",
                    location: profileData.location || "",
                    bio_short: profileData.bio_short || "",
                    bio_long: profileData.bio_long || "",
                    is_hireable: Boolean(profileData.is_hireable),
                    socials: socialsFromDb,
                    hero_image_codes: heroCodesFromDb,
                });

                if (profileData.avatar) {
                    const isFullUrl = profileData.avatar.startsWith("http://") || profileData.avatar.startsWith("https://");
                    setAvatarPreview(isFullUrl ? profileData.avatar : `${StoragePath}${profileData.avatar}`);
                } else {
                    setAvatarPreview("");
                }
                setAvatarFile(null);
                setCvFile(null);
            } else {
                resetForm();
            }
        }, 0);
    }, [open, profileData, reset, StoragePath]);

    // --- Submit Handler ---
    const onSubmit = (data: ProfileFormData) => {
        if (!profileData?.id) {
            alert("Profile ID not found");
            return;
        }

        const basePayload: Record<string, unknown> = {
            name: data.name.trim(),
            headline: normalizeWhitespace(data.headline) || "",
            role: data.role.trim() || "",
            location: data.location.trim() || "",
            bio_short: normalizeWhitespace(data.bio_short) || "",
            bio_long: normalizeWhitespace(data.bio_long) || "",
            is_hireable: data.is_hireable ? "1" : "0",
            socials: serializeSocialsForDatabase(data.socials),
            hero_image_codes: serializeHeroCodesForDatabase(data.hero_image_codes),
        };

        const formDataPayload = buildFormData(basePayload, {
            activeBackend,
            isUpdate: true,
            customFiles: {
                avatar: avatarFile,
                cv_files: cvFile,
            },
        });

        updateMutation.mutate(
            { id: profileData.id, data: formDataPayload },
            {
                onSuccess: () => {
                    onSuccess();
                    onClose();
                    alert("Profile Updated!");
                },
                onError: (error: unknown) => {
                    console.error("Error submitting profile:", error);
                    alert("Failed to save profile. Please try again.");
                },
            }
        );
    };

    // --- Return ---
    return {
        isLoading,
        isSubmitting,
        avatarPreview,
        handleAvatarChange,
        cvFile,
        setCvFile,
        methods,
        handleSubmit: handleSubmit(onSubmit),
    };
};
