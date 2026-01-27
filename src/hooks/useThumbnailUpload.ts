import {useState} from "react";

interface UseThumbnailUploadReturn {
    thumbnailFile: File | null;
    thumbnailPreview: string;
    handleThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    resetThumbnail: () => void;
    setThumbnailFile: (file: File | null) => void;
    setThumbnailPreview: (preview: string) => void;
}

export const useThumbnailUpload = (): UseThumbnailUploadReturn => {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const resetThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview("");
    };

    return {
        thumbnailFile,
        thumbnailPreview,
        handleThumbnailChange,
        resetThumbnail,
        setThumbnailFile,
        setThumbnailPreview,
    };
};
