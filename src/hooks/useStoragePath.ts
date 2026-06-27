import {useApi} from "@/contexts/useApi.ts";

/**
 * Custom hook to get the active storage path based on the current backend
 * @returns Storage path URL (Go or Laravel)
 */
export function useStoragePath(): string {
    const {activeBackend} = useApi();

    if (activeBackend === 'express') {
        return import.meta.env.VITE_GO_FILE_URL || '/files/';
    }
    
    if (activeBackend === 'go') {
        return import.meta.env.VITE_GO_FILE_URL || '/files/';
    }

    return import.meta.env.VITE_LARAVEL_FILE_URL || '/files/';
}
