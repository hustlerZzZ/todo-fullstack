import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

import { isLoggedIn, signupAuth, userData } from "../atoms/atom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const setIsLoggedIn = useSetRecoilState(isLoggedIn);
    const [auth, setAuth] = useRecoilState(signupAuth);
    const setUserInfo = useSetRecoilState(userData);
    const navigate = useNavigate();

    function handleUsernameChange(e) {
        setAuth((prevAuth) => ({
            ...prevAuth,
            userName: e.target.value,
        }));
    }

    function handleEmailChange(e) {
        setAuth((prevAuth) => ({
            ...prevAuth,
            email: e.target.value,
        }));
    }

    function handleConfirmPasswordChange(e) {
        setAuth((prevAuth) => ({
            ...prevAuth,
            passwordConfirm: e.target.value,
        }));
    }

    function handlePasswordChange(e) {
        setAuth((prevAuth) => ({
            ...prevAuth,
            password: e.target.value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:5555/api/v1/user/signUp",
                auth
            );

            const data = res.data;

            setUserInfo({
                email: data.data.user.email,
                userName: data.data.user.userName,
                userTodos: data.data.user.userTodos,
            });

            toast("SignUp Success! ✅", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            Cookies.set("authToken", data.token, { expires: 7 });

            setAuth({
                userName: "",
                email: "",
                password: "",
                passwordConfirm: "",
            });

            if (data.status === "success") {
                setTimeout(function () {
                    setIsLoggedIn(true);
                    navigate("/app");
                }, 2000);
            }
        } catch (error) {
            console.error(
                "There was an error during the signup process:",
                error
            );

            toast("SignUp Failed! ❌", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <div className="bg-gray-700">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <form
                className="flex flex-col gap-4 justify-center mx-auto items-center mt-36"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-white">
                        Username :
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={auth.userName}
                        onChange={handleUsernameChange}
                        className="focus:outline-none py-1 px-2 w-72 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-white">
                        Email :
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={auth.email}
                        onChange={handleEmailChange}
                        className="focus:outline-none py-1 px-2 w-72 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-white">
                        Password :
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={auth.password}
                        onChange={handlePasswordChange}
                        className="focus:outline-none py-1 px-2 w-72 rounded"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirmPassword" className="text-white">
                        Confirm Password :
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={auth.passwordConfirm}
                        onChange={handleConfirmPasswordChange}
                        className="focus:outline-none py-1 px-2 w-72 rounded"
                        required
                    />
                </div>
                <div className="gap-7 flex flex-col justify-center items-center mx-auto">
                    <div className="text-white">
                        <h1>
                            Already our member?...{" "}
                            <Link to="/login" className="underline">
                                Login
                            </Link>
                        </h1>
                    </div>
                    <div className="text-white">
                        <button
                            type="submit"
                            className="bg-blue-500 py-2 px-4 rounded-md font-medium"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;
