const GUEST_TOKEN = import.meta.env.VITE_GUEST_TOKEN;

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_type"); // Remove marker
    window.location.href = "/";
};

export const getToken = () => {
    // Return token TANPA prefix admin_
    return localStorage.getItem("token") || GUEST_TOKEN;
};

export const isAdmin = () => {
    // Cek dari localStorage marker, bukan dari token prefix
    return localStorage.getItem("token_type") === "admin";
};

export const isGuest = () => {
    return (
        !localStorage.getItem("token") ||
        localStorage.getItem("token_type") !== "admin"
    );
};

export const setAdminToken = (token: string) => {
    // Simpan token TANPA prefix
    localStorage.setItem("token", token);
    localStorage.setItem("token_type", "admin");
};

export const getGuestToken = () => {
    return GUEST_TOKEN;
};
