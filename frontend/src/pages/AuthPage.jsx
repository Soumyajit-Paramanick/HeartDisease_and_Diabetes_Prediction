import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import config from "../config";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? `${config.API_BASE_URL}/login`
        : `${config.API_BASE_URL}/register`;

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : formData;

      const res = await axios.post(url, payload);

      alert(res.data.message);

      // LOGIN SUCCESS
      if (isLogin) {
        login({
          name: res.data.user?.name || "User",
          email: formData.email,
        });

        navigate("/");
      }

      // REGISTER SUCCESS → switch to login
      if (!isLogin) {
        setIsLogin(true);
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.error ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full p-3 rounded-xl bg-[#0f223d] border border-cyan-400/20 text-white outline-none";

  return (
    <div className="min-h-screen bg-[#07111f]">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#07111f] via-[#0b1d35] to-[#102a43] px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">

          <h1 className="text-3xl font-bold text-center text-white mb-2">
            {isLogin ? "Login" : "Register"}
          </h1>

          <p className="text-center text-gray-300 mb-6">
            {isLogin
              ? "Login to access disease prediction system"
              : "Create your account to continue"}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={inputStyle}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition disabled:opacity-70"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Login"
                : "Register"}
            </button>
          </form>

          <p className="text-center text-gray-300 mt-6">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() =>
                setIsLogin(!isLogin)
              }
              className="ml-2 text-cyan-400 font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}