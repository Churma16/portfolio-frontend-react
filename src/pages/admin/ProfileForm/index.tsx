import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "@/hooks/useProfile";
import apiClient from "@/api/axios";

import IdentityCard from "./IdentityCard";
import BioCard from "./BioCard";
import SocialCard from "./SocialCard";
import HeroCodeCard from "./HeroCodeCard";
import SaveButton from "./SaveButton";

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
            reset({
                ...profileData,
                is_hireable: Boolean(profileData.is_hireable),
                // Transform Object {twitter: url} -> Array [{platform: 'twitter', url: url}]
                socialsArray: profileData.socials 
                    ? Object.entries(profileData.socials).map(([k, v]) => ({ platform: k, url: v as string })) 
                    : [],
                // Transform Array ["code"] -> Array Object [{value: "code"}] (RHF butuh object unique id)
                hero_image_codes: profileData.hero_image_codes 
                    ? profileData.hero_image_codes.map((code: string) => ({ value: code }))
                    : [],
            });
        }
    }, [profileData, reset]);

    // Setup Mutation
    const mutation = useMutation({
        mutationFn: async (data: ProfileFormValues) => {
            const formData = new FormData();
            
            // Append basic fields
            formData.append("name", data.name);
            formData.append("headline", data.headline || "");
            formData.append("role", data.role || "");
            formData.append("location", data.location || "");
            formData.append("bio_short", data.bio_short || "");
            formData.append("bio_long", data.bio_long || "");
            formData.append("is_hireable", data.is_hireable ? "1" : "0");

            // Transform Array UI kembali ke format DB
            // 1. Socials: Array -> JSON Object
            const socialsObj = data.socialsArray.reduce((acc, curr) => {
                if (curr.platform) acc[curr.platform] = curr.url;
                return acc;
            }, {} as Record<string, string>);
            formData.append("socials", JSON.stringify(socialsObj));

            // 2. Hero Codes: Array Object -> Array String
            const codesArray = data.hero_image_codes.map(c => c.value);
            formData.append("hero_image_codes", JSON.stringify(codesArray));

            formData.append("_method", "PUT");

            // Handle Files
            if (data.avatar_file && data.avatar_file.length > 0) {
                formData.append("avatar_file", data.avatar_file[0]);
            }
            if (data.cv_file && data.cv_file.length > 0) {
                formData.append("cv_file", data.cv_file[0]);
            }

            return apiClient.post("/profile", formData);
        },
        onSuccess: () => {
            alert("Profile Updated!");
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (err) => {
            console.error(err);
            alert("Failed update.");
        }
    });

    const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
        mutation.mutate(data);
    };

    if (isLoading) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto pb-32 min-h-screen">
                  <div className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-white">
                    Edit Profile
                </h2>
                <p className="text-lara-sky/80">
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