// src/contexts/ApiContext.tsx
import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import apiClient from '@/api/axios'; // Import your cleaned axios
import {BackendType, getToken} from '@/lib/auth';

// CONFIG: Define your two backends here
const API_CONFIG = {
    laravel: {
        baseURL: import.meta.env.VITE_LARAVEL_URL || "http://localhost:8000/api",
        label: "Laravel",
    },
    go: {
        baseURL: import.meta.env.VITE_GO_URL || "http://localhost:8080/api",
        label: "Go",
    }
};

interface ApiContextProps {
    activeBackend: BackendType;
    switchBackend: (backend: BackendType) => void;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

export const ApiProvider = ({children}: { children: ReactNode }) => {
    // 1. Load the last used backend (or default to laravel)
    const [activeBackend, setActiveBackend] = useState<BackendType>(() => {
        return (localStorage.getItem('preferred_backend') as BackendType) || 'laravel';
    });

    const switchBackend = (backend: BackendType) => {
        setActiveBackend(backend);
        localStorage.setItem('preferred_backend', backend);
        // Optional: Refresh to ensure clean state
        window.location.reload();
    };

    // 2. THE CSS THEME SWITCHER (Bonus!)
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', activeBackend);
    }, [activeBackend]);

    // 3. THE API SWITCHER (Axios Interceptor)
    useEffect(() => {
        const interceptorId = apiClient.interceptors.request.use(config => {
            // A. Set the Base URL dynamically
            config.baseURL = API_CONFIG[activeBackend].baseURL;

            // B. Get the correct token for this backend
            const token = getToken(activeBackend);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        });

        return () => {
            apiClient.interceptors.request.eject(interceptorId);
        };
    }, [activeBackend]);

    return (
        <ApiContext.Provider value={{activeBackend, switchBackend}}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) throw new Error('useApi must be used within ApiProvider');
    return context;
};