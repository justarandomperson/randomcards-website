import { createContext, useContext, useEffect, useState } from "react";
import { validate } from "../../api/axiosInstance";
import axios from "axios";


type User = {
    username: string;
    token: string;
};

type AuthContextType = {
    user: User | null;
    isLoggedIn: boolean;
    login: (token: string, username: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                return;
            }

            try {
                const res = await validate(token);

                setUser({
                    username: res.data.payload.username,
                    token: token
                });

            } 
            catch(error) {
                 if (axios.isAxiosError(error) && error.response?.status === 401) {
                    localStorage.removeItem("token");
                }

                setUser(null);
            }
        };

        validateToken();
    }, []);


    const login = (token: string, username: string) => {
        localStorage.setItem("token", token);
        setUser({username: username, token: token});
    };


    const logout = () => {
        localStorage.removeItem("token");
        console.log("logout was called")
        setUser(null);
    };

    
    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: user !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}