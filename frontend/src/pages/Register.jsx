import { useState } from "react";
import axiosInstance from "../config/axios";
import backGround from "../assets/background.jpg";
import { Link,useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axiosInstance.post("/auth/register", formData);
      // alert("User registered successfully!");
      window.location.href = "/login";
      // navigate('/login');
    } catch (error) {
      console.log(error);
      alert("Error registering user: " + error.response.data.message);
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

      {/* Register Form (Foreground) */}
      <div className="relative bg-white/90 p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md w-full"
          />
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
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md w-full font-bold">
            Register
          </button>
        </form>
        <Link to="/login" className="text-blue-600 hover:underline mt-4 block">Login</Link>
      </div>
    </div>
  );
}
