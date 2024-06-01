/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { isLoggedIn, mobileNavActive } from "../atoms/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

function MobileNav({ handleLogOut }) {
    const loggedIn = useRecoilValue(isLoggedIn);
    const setMobileNav = useSetRecoilState(mobileNavActive);

    return (
        <div className="absolute md:hidden bg-zinc-900 top-0 right-0 h-screen px-20 py-5 text-sm">
            <div className="px-3 py-8">
                <button
                    className="md:hidden flex flex-col gap-1 justify-center items-center"
                    onClick={() => setMobileNav((curr) => !curr)}
                >
                    <span className="w-6 h-0.5 bg-white rounded-xl rotate-45 translate-x-4 translate-y-1.5"></span>
                    <span className="w-6 h-0.5 bg-white rounded-xl -rotate-45 translate-x-4 -translate-y-0"></span>
                </button>
            </div>
            <ul className="flex flex-col gap-8 justify-center items-center font-medium">
                <li>
                    <Link to="/">Home</Link>
                </li>

                {/* Check if the user is logged in or not if not show the logIn or signUp buttons */}
                {isLoggedIn && (
                    <>
                        <li className="border py-1 px-4 rounded-lg">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="bg-blue-600 py-1 px-2 rounded-lg">
                            <Link to="/signup">Sign Up</Link>
                        </li>
                    </>
                )}

                {/* Check if the user is logged in if yes then only show the log out button */}
                {loggedIn && (
                    <button
                        onClick={handleLogOut}
                        className="bg-blue-600 py-1 px-2 rounded-lg"
                    >
                        Log Out
                    </button>
                )}
            </ul>
        </div>
    );
}

export default MobileNav;
