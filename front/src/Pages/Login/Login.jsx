import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock, Eye, EyeSlash } from "@phosphor-icons/react";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const { login, loading, error, setError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password, rememberMe);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Effacer l'erreur quand l'utilisateur tape
    if (error) setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Login Form (50%) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              {/* Voambolan.ai Logo - V stylized with text lines */}
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stylized V */}
                <path
                  d="M6 4L12 18L18 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Text lines representing words/vocabulary */}
                <line x1="4" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                <line x1="16" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
              </svg>
            </div>
            <span className="text-gray-700 font-semibold text-lg">
             Voambola.ai
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Tongasoa eto amin'ny rafitra fidirana
          </h1>
          <p className="text-gray-500 mb-8">
            Midira amin'ny alalan'ny fampidirana ny fampahalalana eto ambany
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <User size={20} className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Teny miafina"
                className="w-full pl-12 pr-12 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeSlash size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-gray-600">Tsarovy aho</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-gray-500 hover:text-blue-600 text-sm"
              >
                Hadino ny tenimiafina?
              </Link>
            </div>

            {/* Login Button and Sign Up Link */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md"
              >
                {loading ? "Midira..." : "Midira"}
              </button>
              <Link
                to="/signup"
                className="text-gray-500 hover:text-blue-600 font-medium whitespace-nowrap"
              >
                Misoratra anarana
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section - Illustration (50%) */}
        <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center p-8">
          {/* SVG Background - Radiant Blue Gradient */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Main radiant gradient - lighter top-left to darker bottom-right */}
              <radialGradient id="radiantMain" cx="30%" cy="20%" r="80%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="1" />
                <stop offset="30%" stopColor="#60a5fa" stopOpacity="1" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
              </radialGradient>

              {/* Large dark blue shape top-right */}
              <radialGradient id="darkShape" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
              </radialGradient>

              {/* Soft elongated curve bottom-left */}
              <radialGradient id="softCurve" cx="0%" cy="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </radialGradient>

              {/* Additional overlay gradient */}
              <radialGradient id="overlayGradient" cx="70%" cy="40%">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Base radiant background */}
            <rect width="1000" height="800" fill="url(#radiantMain)" />

            {/* Large dark blue rounded shape top-right */}
            <ellipse cx="900" cy="50" rx="500" ry="450" fill="url(#darkShape)" />

            {/* Soft elongated curve bottom-left */}
            <ellipse cx="100" cy="750" rx="400" ry="200" fill="url(#softCurve)" />

            {/* Additional soft overlay */}
            <ellipse cx="700" cy="300" rx="350" ry="300" fill="url(#overlayGradient)" />

            {/* Subtle wave on left edge */}
            <path
              d="M 0 0 Q 200 150 150 350 Q 120 550 200 800 L 0 800 Z"
              fill="#93c5fd"
              opacity="0.15"
            />
          </svg>

          {/* Isometric Text Editor Illustration */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="relative" style={{ transform: "perspective(1000px) rotateX(15deg) rotateY(-15deg)" }}>
              
              {/* Bottom document (behind) */}
              <div 
                className="relative"
                style={{ 
                  transform: "translateX(20px) translateY(20px)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div
                  className="w-72 h-96 bg-white rounded-lg relative"
                  style={{
                    boxShadow: "0 15px 40px rgba(0,0,0,0.25)"
                  }}
                >
                  {/* Yellow tab/bookmark on top-right */}
                  <div className="absolute -top-1 right-8 w-12 h-6 bg-yellow-400 rounded-t-lg"></div>
                </div>
              </div>

              {/* Top document (front) with text */}
              <div 
                className="absolute top-0 left-0"
                style={{ 
                  transform: "translateZ(10px)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div
                  className="w-72 h-96 bg-white rounded-lg relative"
                  style={{
                    boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Logo Voambolan.ai on document - centered horizontally */}
                  <div className="absolute top-44 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 4L12 18L18 4"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <line x1="4" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                        <line x1="16" y1="20" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">Voambolan.AI</span>
                  </div>

                  {/* Text lines in upper-left portion */}
                  <div className="absolute top-14 left-6 right-6 space-y-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1 bg-gray-300 rounded"
                        style={{
                          width: i % 3 === 0 ? "95%" : i % 3 === 1 ? "80%" : "90%"
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blue pen positioned diagonally on top document */}
              <div 
                className="absolute"
                style={{ 
                  top: "15%",
                  right: "10%",
                  transform: "rotateZ(45deg) translateZ(20px)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Pen body */}
                <div
                  className="w-40 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full relative"
                  style={{
                    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Pen tip */}
                  <div className="absolute -left-1 top-0 w-3 h-4 bg-gray-800 rounded-l-full"></div>
                  {/* Pen clip */}
                  <div className="absolute left-10 top-0 w-1.5 h-5 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Small square icon with menu lines (top-right) */}
              <div 
                className="absolute"
                style={{ 
                  top: "5%",
                  right: "5%",
                  transform: "translateZ(25px)",
                  transformStyle: "preserve-3d"
                }}
              >
                <div
                  className="w-14 h-14 bg-blue-200 rounded-lg flex flex-col items-center justify-center gap-1.5 p-3"
                  style={{
                    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                  }}
                >
                  {/* Three horizontal lines (menu icon) */}
                  <div className="w-full h-0.5 bg-gray-500 rounded"></div>
                  <div className="w-full h-0.5 bg-gray-500 rounded"></div>
                  <div className="w-full h-0.5 bg-gray-500 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

