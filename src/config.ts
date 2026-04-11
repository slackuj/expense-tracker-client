export const config = {
    apiBaseURI: import.meta.env.VITE_API_BASE_URI,
    endpoints: {
        login: "/auth/login",
        logout: "/auth/logout",
        register: "/auth/register",
    },
};