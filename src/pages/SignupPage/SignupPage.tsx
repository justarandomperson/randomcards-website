import { useForm } from "react-hook-form";
import { signup } from "../../api/axiosInstance";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { SignupForm } from "./shared/types";
import { HttpStatusCode } from "axios";


const SignupPage: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>();
    const { login } = useAuth();


    const onSubmit = async (data: SignupForm) => {
        const res = await signup(data.username, data.password);

        if (res.status == HttpStatusCode.Created) {
            const token = res.data.access_token;
            login(token, data.username);
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
                Signup
            </button>
        </form>
    );
}


export default SignupPage;