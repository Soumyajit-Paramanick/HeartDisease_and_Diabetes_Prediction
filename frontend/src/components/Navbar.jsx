

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  const handleProtectedNavigation = (path) => {
    if (!user) {
      alert("Please login first to access this feature.");
      navigate("/auth");
      return;
    }

    navigate(path);
  };

  return (
    <nav className="w-full px-8 py-5 bg-[#06101d]/90 backdrop-blur-md border-b border-cyan-400/10 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          Health<span className="text-cyan-400">Predict</span>
        </h1>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-gray-300 font-medium">

          <Link
            to="/"
            className="hover:text-cyan-400 transition duration-300"
          >
            Home
          </Link>

          <button
            onClick={() =>
              handleProtectedNavigation("/diabetes")
            }
            className="hover:text-cyan-400 transition duration-300"
          >
            Diabetes
          </button>

          <button
            onClick={() =>
              handleProtectedNavigation("/heart")
            }
            className="hover:text-cyan-400 transition duration-300"
          >
            Heart Disease
          </button>

          <button
            onClick={() =>
              handleProtectedNavigation("/models")
            }
            className="hover:text-cyan-400 transition duration-300"
          >
            Model_Evaluation
          </button>

          {user ? (
            <>
              <span className="text-cyan-300 font-semibold">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-lg font-semibold transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}