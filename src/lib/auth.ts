// src/lib/auth.ts

// Define the keys we will use in localStorage
export const TOKEN_KEYS = {
    laravel: "laravel_token",
    go: "go_token",
    express: "express_token",
};

export type BackendType = "laravel" | "go" | "express";

export const logout = () => {
    localStorage.removeItem(TOKEN_KEYS.laravel);
    localStorage.removeItem(TOKEN_KEYS.go);
    localStorage.removeItem(TOKEN_KEYS.express);
    window.location.href = "/";
};

// GET token based on which backend is active
export const getToken = (backend: BackendType = "laravel") => {
    return localStorage.getItem(TOKEN_KEYS[backend]);
};

// CHECK if token exists for the specific backend
export const hasToken = (backend: BackendType = "laravel") => {
    return !!localStorage.getItem(TOKEN_KEYS[backend]);
};

// SET token for the specific backend
export const setToken = (token: string, backend: BackendType = "laravel") => {
    localStorage.setItem(TOKEN_KEYS[backend], token);
};