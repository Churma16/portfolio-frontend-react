export const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
};

// Untuk mendapatkan token dari localStorage
export const getToken = () => {
    return localStorage.getItem("token");
};

// Utuk memeriksa apakah token ada di localStorage
export const hasToken = () => {
    return !!localStorage.getItem("token");
};

// Untuk menyimpan token ke localStorage
export const setToken = (token: string) => {
    localStorage.setItem("token", token);
};
