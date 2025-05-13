import axios from "axios";

const API_URL = "http://130.25.12.189:8000/api/token/"; 
// const API_URL = "http://localhost:8000/api/token/";  // Assicurati che Django sia avviato

// Funzione per fare login
export const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL, { username, password });
        if (response.data.access) {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("user", response.data.id);
            return response.data;
        }
    } catch (error) {
        console.error("Errore nel login", error);
        throw error;
    }
};

// Funzione per fare logout
export const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
};