import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedIn, mobileNavActive } from "../atoms/atom";
import MobileNav from "./MobileNav";
import Cookies from "js-cookie";

function Navbar() {
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);
    const [mobileNav, setMobileNav] = useRecoilState(mobileNavActive);
    const navigate = useNavigate();

    function handleLogOut() {
        setLoggedIn(false);
        Cookies.remove("authToken");
        navigate("/");
    }

    return (
        <div className="relative flex justify-between py-2 px-8 bg-gray-800 text-white">
            {/* Logo */}
            <div className="flex gap-2 justify-center items-center font-bold">
                <img src="/fav.png" alt="logo" className="w-7 rounded" />
                <h1>Todoist</h1>
            </div>

            {/* Links */}
            <div className="hidden md:block">
                <ul className="flex gap-8 justify-center items-center font-medium">
                    {!loggedIn && <Link to="/">Home</Link>}

                    {/* Check if the user is logged in or not if not show the logIn or signUp buttons */}
                    {!loggedIn && (
                        <>
                            <Link
                                to="/login"
                                className="bg-white text-black py-1.5 px-6 rounded-md font-medium"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="bg-blue-500 py-1.5 px-4 rounded-md font-medium"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}

                    {/* Check if the user is logged in if yes then only show the log out button */}
                    {loggedIn && (
                        <button
                            className="bg-blue-500 py-1.5 px-4 rounded-md font-medium"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </button>
                    )}
                </ul>
            </div>

            {/* Hamburger Menu */}
            {!mobileNav && (
                <>
                    <button
                        className="md:hidden flex flex-col gap-1 justify-center items-center"
                        onClick={() => setMobileNav((curr) => !curr)}
                    >
                        <span className="w-6 h-0.5 bg-white rounded-xl"></span>
                        <span className="w-6 h-0.5 bg-white rounded-xl"></span>
                        <span className="w-6 h-0.5 bg-white rounded-xl"></span>
                    </button>
                </>
            )}

            {/* Mobile Nav */}
            {mobileNav && <MobileNav handleLogOut={handleLogOut} />}
        </div>
    );
}

export default Navbar;
