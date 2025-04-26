import { Outlet, Link } from "react-router-dom";
import { useEffect } from "react";

function Layout() {
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href="/";
  }
  return (
    <div className="flex flex-col w-screen h-screen min-h-screen">
      {/* Background Image with Blur */}
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-[url('/Indian-Pattern.png')] blur-lg -z-10 p-6"></div>

      {/* Navbar (Fixed to Top) */}
      <nav className="bg-gray-900 bg-opacity-90 text-white py-4 px-8 flex items-center justify-between w-full relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-4 font-cursive text-2xl font-bold">
          <img src="/surSangam-icon.png" alt="Sursangam Logo" className="h-14 w-auto" />
          <span>Sursangam</span>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link to="/dashboard" className="text-white text-lg hover:underline">Home</Link>
          <Link to="/audioCheck" className="text-white text-lg hover:underline">Practice</Link>
          <Link to="/about" className="text-white text-lg hover:underline">About</Link>
          <Link to="/progress" className="text-white text-lg hover:underline">Progress</Link>
          <a href="http://localhost:5174/" className="text-white text-lg hover:underline">Buy</a>
          {token ? (
            <Link onClick={()=>{logout();}} className="text-white text-lg hover:underline">Logout</Link>
          ) : (
            <Link to="/login" className="text-white text-lg hover:underline">Login</Link>
          )}
        </div>
      </nav>

      {/* Content Wrapper (Takes Remaining Height) */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 relative z-0">
        
        <Outlet />
      </main>

      {/* Footer (Fixed to Bottom) */}
      <footer className="bg-gray-800 bg-opacity-90 text-white py-6 text-center w-full relative z-10">
        {/* Footer Navigation */}
        <div className="flex justify-center gap-6 mb-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/audioCheck" className="text-white hover:underline">Practice</Link>
          <Link to="/about" className="text-white hover:underline">About</Link>
          <Link to="/progress" className="text-white hover:underline">Progress</Link>
        </div>

        {/* Contact Info */}
        <p className="text-gray-400 text-sm">Contact us: demo@example.com | +91 98765 43210</p>

        {/* Quote */}
        <p className="italic text-lg text-yellow-400 font-bold mt-2">
          🎶 "संगीत एक ऐसी भाषा है, जिसे शब्दों की जरूरत नहीं होती।" 🎵
        </p>
      </footer>
    </div>
  );
}

export default Layout;
