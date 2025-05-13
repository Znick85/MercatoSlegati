import axios from "axios";

// const API_BASE_URL = "http://localhost:8000/api/";
const API_BASE_URL = "http://130.25.12.189:8000/api/";

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Intercetta le richieste e aggiunge il token JWT
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            try {
                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post("http://130.25.12.189:8000/api/token/refresh/", {
                    refresh: refreshToken,
                });

                // const response = await axios.post("http://localhost:8000/api/token/refresh/", {
                //     refresh: refreshToken,
                // });

                localStorage.setItem("accessToken", response.data.access);
                error.config.headers.Authorization = `Bearer ${response.data.access}`;
                return axios(error.config);
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login"; // Reindirizza al login
            }
        }
        return Promise.reject(error);
    }
);



export default api;
