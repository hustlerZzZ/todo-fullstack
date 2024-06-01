import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="font-montserrat grid grid-rows-[auto_1fr_auto] h-screen">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
