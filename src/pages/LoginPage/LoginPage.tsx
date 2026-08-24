import { useForm } from "react-hook-form";
import { login as loginAxios } from "../../api/axiosInstance";
import { useAuth } from "../../contexts/AuthContext/AuthContext";


type LoginForm = {
    username: string;
    password: string;
};


const LoginPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>();
    const { login } = useAuth()

    const onSubmit = async (data: LoginForm) => {
        const res = await loginAxios(data.username, data.password);
        console.log(res.status)
        if (res.status == 200)
        {
            const token =  res.data.access_token
            login(token, data.username)
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h3>Username:</h3>

                <input
                    {...register("username", {
                        required: "Username is required",
                    })}
                />

                {errors.username && (
                    <p>{errors.username.message}</p>
                )}
            </div>

            <div>
                <h3>Password:</h3>

                <input
                    type="password"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />

                {errors.password && (
                    <p>{errors.password.message}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting}>
                Login
            </button>
        </form>
    );
};


export default LoginPage;