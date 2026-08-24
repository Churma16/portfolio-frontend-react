import {useApi} from "@/contexts/useApi.ts";

/**
 * Custom hook to get the active storage path based on CDN or the current backend
 * Prioritizes Cloudflare R2 CDN URL (VITE_STORAGE_CDN_URL) when configured.
 * @returns Storage path URL
 */
export function useStoragePath(): string {
    const cdnUrl = import.meta.env.VITE_STORAGE_CDN_URL;
    if (cdnUrl) {
        return cdnUrl.endsWith('/') ? cdnUrl : `${cdnUrl}/`;
    }

    const {activeBackend} = useApi();

    if (activeBackend === 'express') {
        return import.meta.env.VITE_EXPRESS_FILE_URL || import.meta.env.VITE_GO_FILE_URL || '/storage/';
    }
    
    if (activeBackend === 'go') {
        return import.meta.env.VITE_GO_FILE_URL || '/storage/';
    }

    if (activeBackend === 'spring') {
        return import.meta.env.VITE_SPRING_FILE_URL || '/storage/';
    }

    return import.meta.env.VITE_LARAVEL_FILE_URL || '/storage/';
}
