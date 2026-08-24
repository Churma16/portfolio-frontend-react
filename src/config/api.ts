export type BackendType = 'laravel' | 'go' | 'express' | 'spring';

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
        baseURL: "http://localhost:4000/api",
        tokenKey: "express_token",
        label: "Express (Node.js)",
    },
    spring: {
        baseURL: "http://localhost:8081/api",
        tokenKey: "spring_token",
        label: "Spring Boot (Java)",
    }
};