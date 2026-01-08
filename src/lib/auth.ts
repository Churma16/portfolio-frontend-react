const GUEST_TOKEN = import.meta.env.VITE_GUEST_TOKEN;

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("abilities");
    window.location.href = "/";
};

export const getToken = () => {
    // Return token TANPA prefix admin_
    return localStorage.getItem("token") || GUEST_TOKEN;
};

export const isAdmin = () => {
    // First check: must have a token stored (not just guest token)
    const token = localStorage.getItem("token");
    if (!token) return false;

    // Second check: abilities must include "admin"
    const abilities = localStorage.getItem("abilities");
    if (!abilities) return false;

    try {
        const parsedAbilities = JSON.parse(abilities);
        return (
            Array.isArray(parsedAbilities) && parsedAbilities.includes("admin")
        );
    } catch {
        return false;
    }
};

export const isGuest = () => {
    return !isAdmin();
};

export const setAdminToken = (token: string, abilities?: string[]) => {
    // Simpan token TANPA prefix
    localStorage.setItem("token", token);
    if (abilities) {
        localStorage.setItem("abilities", JSON.stringify(abilities));
    }
};

export const setAbilities = (abilities: string[]) => {
    localStorage.setItem("abilities", JSON.stringify(abilities));
};

export const getAbilities = () => {
    const abilities = localStorage.getItem("abilities");
    if (!abilities) return [];
    try {
        return JSON.parse(abilities);
    } catch {
        return [];
    }
};

export const getGuestToken = () => {
    return GUEST_TOKEN;
};
