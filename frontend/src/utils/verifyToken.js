import Cookies from "js-cookie";
import axios from "axios";

export async function verifyToken() {
    const token = Cookies.get("authToken");
    if (!token) {
        return null;
    }

    try {
        const res = await axios.get(
            "http://127.0.0.1:5555/api/v1/user/verifyToken",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.err("Token verification failed!");
        return null;
    }
}
