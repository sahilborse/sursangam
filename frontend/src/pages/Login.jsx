import { useState } from "react";
import axiosInstance from "../config/axios";
import backGround from "../assets/background.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("token", data.token.token);
      localStorage.setItem("user", JSON.stringify(data.token.userId));  
  
      window.location.href = "/dashboard"; // Redirect after login
    } catch (error) {
      console.log(error);
      alert("Login failed: " + error.response.data.error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-screen">
      {/* Background Image with Blur & Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backGround})`,
          filter: "blur(4px) brightness(60%)",
        }}
      ></div>

      {/* Login Form (Foreground) */}
      <div className="relative bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-md w-full font-bold">
            Login
          </button>
        </form>
        <Link to="/register" className="text-blue-600 hover:underline mt-4 block">Register</Link>
      </div>
    </div>
  );
}
