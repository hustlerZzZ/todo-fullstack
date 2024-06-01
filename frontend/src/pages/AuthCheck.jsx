/* eslint-disable react/prop-types */
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, userData } from "../atoms/atom";
import { useEffect } from "react";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";

function AuthCheck({ children }) {
    const setIsLoggedIn = useSetRecoilState(isLoggedIn);
    const setUserInfo = useSetRecoilState(userData);
    const loggedIn = useRecoilValue(isLoggedIn);
    const navigate = useNavigate();

    useEffect(
        function () {
            async function checkAuth() {
                const data = await verifyToken();
                if (data) {
                    setIsLoggedIn(true);
                    setUserInfo({
                        email: data.data.currentUser.email,
                        userName: data.data.currentUser.userName,
                        userTodos: data.data.currentUser.userTodos,
                    });
                } else {
                    setIsLoggedIn(false);
                }
            }
            checkAuth();
        },
        [setIsLoggedIn, setUserInfo]
    );

    useEffect(
        function () {
            if (loggedIn) {
                navigate("/app");
            }
        },
        [loggedIn, navigate]
    );

    return <>{children}</>;
}

export default AuthCheck;
