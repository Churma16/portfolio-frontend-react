import {useEffect} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useProfile} from "@/features/profile/hooks/useProfile.ts";
import apiClient from "@/api/axios.ts";

import IdentityCard from "./components/IdentityCard.tsx";
import BioCard from "./components/BioCard.tsx";
import SocialCard from "./components/SocialCard.tsx";
import HeroCodeCard from "./components/HeroCodeCard.tsx";
import SaveButton from "./components/SaveButton.tsx";

// Tipe Data Frontend (Sedikit beda dengan DB untuk memudahkan form handling)
export interface ProfileFormValues {
    name: string;
    headline: string;
    role: string;
    location: string;
    bio_short: string;
    bio_long: string;
    is_hireable: boolean;
    avatar: string | null; // URL dari DB
    cv_files: string | null; // URL dari DB

    // Kita ubah object socials menjadi array agar mudah diedit di UI
    socialsArray: { platform: string; url: string }[];
    hero_image_codes: { value: string }[]; // Array of objects untuk useFieldArray

    // Field file upload (tidak ada di data fetch)
    avatar_file?: FileList;
    cv_file?: FileList;
}

export default function ProfileForm() {
    const queryClient = useQueryClient();
    const { data: profileData, isLoading } = useProfile();

    // Setup Form
    const methods = useForm<ProfileFormValues>({
        defaultValues: {
            name: "",
            headline: "",
            socialsArray: [],
            hero_image_codes: [],
            is_hireable: false,
        },
    });

    const { reset, handleSubmit } = methods;

    // Sync Data Fetch -> Form
    useEffect(() => {
        if (profileData) {
            // Parse hero_image_codes jika berupa string JSON
            let heroCodes = [];
            if (profileData.hero_image_codes) {
                if (typeof profileData.hero_image_codes === "string") {
                    try {
                        heroCodes = JSON.parse(profileData.hero_image_codes);
                    } catch {
                        heroCodes = [];
                    }
                } else if (Array.isArray(profileData.hero_image_codes)) {
                    heroCodes = profileData.hero_image_codes;
                }
            }

            reset({
                ...profileData,
                is_hireable: Boolean(profileData.is_hireable),
                // Transform Object {twitter: url} -> Array [{platform: 'twitter', url: url}]
                socialsArray: profileData.socials
                    ? Object.entries(profileData.socials).map(([k, v]) => ({
                          platform: k,
                          url: v as string,
                      }))
                    : [],
                // Transform Array ["code"] -> Array Object [{value: "code"}] (RHF butuh object unique id)
                hero_image_codes: heroCodes.map((code: string) => ({
                    value: code,
                })),
            });
        }
    }, [profileData, reset]);

    // Setup Mutation
    const mutation = useMutation({
        mutationFn: async (data: ProfileFormValues) => {
            const formData = new FormData();

            // Helper function untuk clean whitespace
            const cleanText = (text: string) =>
                text.trim().replace(/\s+/g, " "); // Replace multiple spaces/newlines with single space

            // Append basic fields
            formData.append("name", data.name.trim());
            formData.append("headline", cleanText(data.headline) || "");
            formData.append("role", data.role.trim() || "");
            formData.append("location", data.location.trim() || "");
            formData.append("bio_short", cleanText(data.bio_short) || "");
            formData.append("bio_long", cleanText(data.bio_long) || "");
            formData.append("is_hireable", data.is_hireable ? "1" : "0");

            // Transform Array UI kembali ke format DB
            // 1. Socials: Array -> JSON Object
            const socialsObj = data.socialsArray.reduce((acc, curr) => {
                if (curr.platform) acc[curr.platform] = curr.url;
                return acc;
            }, {} as Record<string, string>);
            formData.append("socials", JSON.stringify(socialsObj));

            // 2. Hero Codes: Array Object -> Array String
            // Filter out empty values dan extract value property
            const codesArray = data.hero_image_codes
                .map((c) => c.value.trim())
                .filter((val) => val !== ""); // Remove empty strings
            formData.append("hero_image_codes", JSON.stringify(codesArray));

            // Handle Files
            if (data.avatar_file && data.avatar_file.length > 0) {
                formData.append("avatar", data.avatar_file[0]);
            }
            if (data.cv_file && data.cv_file.length > 0) {
                formData.append("cv_files", data.cv_file[0]);
            }

            // GET profile ID dari data fetch
            const profileId = profileData?.id;
            if (!profileId) {
                throw new Error("Profile ID tidak ditemukan");
            }

            // POST ke /profiles/{id} dengan method override untuk PUT
            // Laravel akan membaca _method dan treat sebagai PUT request
            formData.append("_method", "PUT");

            // DEBUG: Log semua FormData entries
            console.log("=== FormData Debug ===");
            formData.forEach((value, key) => {
                if (value instanceof File) {
                    console.log(`${key}: File(${value.name})`);
                } else {
                    console.log(`${key}: ${value}`);
                }
            });
            console.log("=== End FormData Debug ===");

            return apiClient.post(`/profiles/${profileId}`, formData);
        },
        onSuccess: () => {
            alert("Profile Updated!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (err: any) => {
            console.error("=== Full Error ===");
            console.error("Status:", err.response?.status);
            console.error("Response data:", err.response?.data);
            console.error("Error messages:", err.response?.data?.errors);
            console.error("=== End Error ===");
            alert("Failed update. Check console for validation errors.");
        },
    });

    const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
        mutation.mutate(data);
    };

    if (isLoading) return <div className="p-8 text-foreground">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-32 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-foreground">
                    Edit Profile
                </h2>
                <p className="text-accent/80">
                    Manage your public presence and bio.
                </p>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Perhatikan: Tidak ada props yang dikirim! Bersih! */}
                    <IdentityCard />
                    <BioCard />
                    <SocialCard />
                    <HeroCodeCard />
                    <SaveButton isSubmitting={mutation.isPending} />
                </form>
            </FormProvider>
        </div>
    );
}
