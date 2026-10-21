import axios from "axios"
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
    baseURL: backendURL
})


axiosInstance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export const signup = async (username: string, password: string) => {
    return (await axiosInstance.post("/auth/signup", {username: username, password: password}))
}

export const login = async (username: string, password: string) => {
    return (await axiosInstance.post("/auth/login", {username: username, password: password}))
}


export const validate = async (token: string) => {
    return (await axiosInstance.post("/auth/validate", {token: token}))
}

export const fetchStorage = async () => {
    try {
        const { data } = await axiosInstance.get("/decks");
        return data;
    } 
    catch (error) {
        console.error('Could not load users: ' + error);
    }

}

