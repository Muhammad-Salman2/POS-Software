import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Instance/api";
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setAccessToken } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);

    try {
      const response = await api.post("user/login", formData);
      const { user, accessToken } = response.data.data;

      setUser(user);
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
      toast.success("Login successful!");
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error details:", error);
      const errMsg = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C3333] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-[#1C3333]/20"
      >
        <div className="bg-white p-8 text-center border-b border-[#1C3333]/20">
          <h1 className="text-2xl font-bold text-[#1C3333]">Welcome Back</h1>
          <p className="mt-2 text-[#1C3333]/80">Sign in to continue to your account</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#1C3333]">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#1C3333]/60" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-[#1C3333]/30 rounded-md focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] transition text-[#1C3333] bg-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-[#1C3333]">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#1C3333]/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border border-[#1C3333]/30 rounded-md focus:ring-2 focus:ring-[#1C3333] focus:border-[#1C3333] transition text-[#1C3333] bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#1C3333]/60 hover:text-[#1C3333]" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#1C3333]/60 hover:text-[#1C3333]" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/forget-password")}
                className="text-sm text-[#1C3333] cursor-pointer hover:text-[#1C3333]/70 hover:underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className={`w-full py-3 px-4 cursor-pointer rounded-md font-medium text-white transition-colors ${
                isLoading
                  ? "bg-[#1C3333]/80 cursor-not-allowed"
                  : "bg-[#1C3333] hover:bg-[#1C3333]/90 shadow-sm"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0h5.291A11.965 11.965 0 0124 12h-4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;