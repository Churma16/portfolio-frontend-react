import {useProfileForm} from "@/features/profile/hooks/useProfileForm.ts";
import IdentityCard from "./components/IdentityCard.tsx";
import BioCard from "./components/BioCard.tsx";
import SocialCard from "./components/SocialCard.tsx";
import HeroCodeCard from "./components/HeroCodeCard.tsx";
import SaveButton from "./components/SaveButton.tsx";
import AdminHeader from "@/components/common/AdminHeader.tsx";

export default function ProfileForm() {
    const {
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
    } = useProfileForm({
        open: true,
        onSuccess: () => {
            // Optional: Handle success
        },
        onClose: () => {
            // Optional: Handle close
        },
    });

    if (isLoading) return <div className="p-8 text-foreground">Loading...</div>;

    const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCvFile(file);
        }
    };

    return (
        <div className="min-h-screen pb-32">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <AdminHeader title={"Edit Profile"} subtitle={"Manage your public presence and bio."}/>
            </div>
            <div className="max-w-5xl mx-auto px-4 pt-8">
                <div className="mb-12">
                    <h2 className="text-4xl font-heading font-bold text-foreground">
                        Edit Profile
                    </h2>
                    <p className="text-accent/70 mt-2 text-lg">
                        Manage your public presence and bio.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <IdentityCard
                        formData={formData}
                        handleInputChange={handleInputChange}
                        avatarPreview={avatarPreview}
                        handleAvatarChange={handleAvatarChange}
                    />
                    <BioCard
                        formData={formData}
                        handleInputChange={handleInputChange}
                        cvFile={cvFile}
                        handleCVChange={handleCVChange}
                    />
                    <SocialCard
                        socialsArray={socialsArray}
                        setSocialsArray={setSocialsArray}
                    />
                    <HeroCodeCard
                        heroCodesArray={heroCodesArray}
                        setHeroCodesArray={setHeroCodesArray}
                    />
                    <SaveButton isSubmitting={isSubmitting}/>
                </form>
            </div>
        </div>
    );
}
