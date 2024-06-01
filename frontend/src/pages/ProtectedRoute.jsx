/* eslint-disable react/prop-types */

import { useRecoilValue } from "recoil";
import { isLoggedIn } from "../atoms/atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
    const isAuthenticated = useRecoilValue(isLoggedIn);
    const navigate = useNavigate();

    useEffect(
        function () {
            if (!isAuthenticated) navigate("/");
        },
        [isAuthenticated, navigate]
    );

    return isAuthenticated ? children : null;
}

export default ProtectedRoute;
