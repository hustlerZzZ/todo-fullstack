import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WebApp from "./pages/WebApp";
import { RecoilRoot } from "recoil";
import ProtectedRoute from "./pages/ProtectedRoute";
import AuthCheck from "./pages/AuthCheck";

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <AuthCheck>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/app"
                                element={
                                    <ProtectedRoute>
                                        <WebApp />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Routes>
                </AuthCheck>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
