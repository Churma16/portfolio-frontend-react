// src/contexts/ApiContext.tsx
import React, {createContext, ReactNode, useEffect, useRef, useState} from 'react';
import apiClient from '@/api/axios';
import {BackendType, getToken} from '@/lib/auth';
import {useQueryClient} from '@tanstack/react-query';

const API_CONFIG = {
    laravel: {
        baseURL: import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api",
        storageURL: import.meta.env.VITE_LARAVEL_FILE_URL || "http://localhost:8000/files/",
        label: "Laravel",
    },
    go: {
        baseURL: import.meta.env.VITE_GO_URL || "http://localhost:8080/api",
        storageURL: import.meta.env.VITE_GO_FILE_URL || "http://localhost:8080/files/",
        label: "Go",
    },
    express: {
        baseURL: import.meta.env.VITE_EXPRESS_URL || "http://localhost:4000/api",
        storageURL: import.meta.env.VITE_GO_FILE_URL || "http://localhost:8080/files/",
        label: "Express",
    }
};

interface ApiContextProps {
    activeBackend: BackendType;
    switchBackend: (backend: BackendType) => void;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider = ({children}: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    // 1. State untuk React Reactivity (UI update)
    const [activeBackend, setActiveBackend] = useState<BackendType>(() => {
        return (localStorage.getItem('preferred_backend') as BackendType) || 'laravel';
    });

    // 2. Ref untuk "Live Value" (Biar Interceptor baca nilai terbaru DETIK ITU JUGA)
    const backendRef = useRef(activeBackend);

    const switchBackend = (backend: BackendType) => {
        // A. Update Ref DULUAN (Penting! Sebelum re-render terjadi)
        backendRef.current = backend;

        // B. Simpan ke Storage
        localStorage.setItem('preferred_backend', backend);

        // C. Baru update State (Akan memicu re-render anak-anak)
        setActiveBackend(backend);

        // D. Bersihkan cache lama agar UI loading ulang
        console.log(`Switching to ${backend}... Nuking Cache.`);
        queryClient.cancelQueries();
        queryClient.resetQueries();
    };

    // 3. Efek untuk Ganti CSS Theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', activeBackend);
    }, [activeBackend]);

    // 4. SETUP INTERCEPTOR (Cuma sekali saat mount!)
    useEffect(() => {
        const interceptorId = apiClient.interceptors.request.use(config => {
            // TRICK UTAMA: Baca dari Ref, bukan dari State!
            // Ini menjamin kita dapat nilai 'backend' yang baru saja diset di switchBackend
            // meskipun useEffect ini tidak dijalankan ulang.
            const currentBackend = backendRef.current;

            // Set URL & Token
            config.baseURL = API_CONFIG[currentBackend].baseURL;

            const token = getToken(currentBackend);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        return () => {
            apiClient.interceptors.request.eject(interceptorId);
        };
    }, []); // Dependency array KOSONG. Kita tidak perlu re-create interceptor.

    return (
        <ApiContext.Provider value={{activeBackend, switchBackend}}>
            {children}
        </ApiContext.Provider>
    );
};

export {ApiContext};