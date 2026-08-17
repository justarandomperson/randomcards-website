import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { validate } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";


type User = {
    username: string;
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
                    });

                } catch {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            };

            validateToken();
        }, []);

    const login = (token: string, username: string) => {
        localStorage.setItem("token", token);
        setUser({username: username});
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: true, //user !== null,
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
};