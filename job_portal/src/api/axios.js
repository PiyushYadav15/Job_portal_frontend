import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach access token to every request
api.interceptors.request.use(
    (config) => {

        const accessToken = localStorage.getItem("access");

        if (accessToken) {

            config.headers.Authorization = `Bearer ${accessToken}`;

        }

        return config;

    },
    (error) => Promise.reject(error)
);

// Refresh expired access token automatically
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refresh");

            if (!refreshToken) {

                localStorage.clear();

                window.location.href = "/login";

                return Promise.reject(error);

            }

            try {

                const response = await axios.post(

                    `${API_BASE_URL}/auth/token/refresh/`,

                    {
                        refresh: refreshToken,
                    }

                );

                const newAccess = response.data.access;

                localStorage.setItem(
                    "access",
                    newAccess
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            }

            catch (refreshError) {

                localStorage.clear();

                window.location.href = "/login";

                return Promise.reject(refreshError);

            }

        }

        return Promise.reject(error);

    }

);

export default api;