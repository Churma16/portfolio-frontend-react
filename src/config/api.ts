export type BackendType = 'laravel' | 'go' | 'express';

export const API_CONFIG = {
    laravel: {
        baseURL: "http://localhost:8000/api", // Change to your actual Laravel URL
        tokenKey: "laravel_token",
        label: "Laravel (PHP)",
    },
    go: {
        baseURL: "http://localhost:8080/api", // Change to your actual Go URL
        tokenKey: "go_token",
        label: "Go (Golang)",
    },
    express: {
        baseURL: "http://localhost:8000/api", // Placeholder: using Laravel URL for now
        tokenKey: "express_token",
        label: "Express (Node.js)",
    }
};