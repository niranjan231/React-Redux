import React, { useState } from "react";
import { login } from "../Service/LoginApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await login(formData);
            console.log("API Response:", res.data);

            if (res.data?.accessToken) {
                localStorage.setItem("authToken", res.data.accessToken);
                toast.success("Login successful! 🎉", { position: "top-center" });
                navigate("/navbar");
            } else {
                toast.error("Invalid credentials. Please try again!", { position: "top-center" });
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Login failed! Please check your username and password.", { position: "top-center" });
        }
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={handleSubmit} className="login-box">
                <input name="username" value={formData.username} onChange={handleChange} type="text" placeholder="Username" autoComplete="off" />
                <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" autoComplete="new-password" />
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default Login;
