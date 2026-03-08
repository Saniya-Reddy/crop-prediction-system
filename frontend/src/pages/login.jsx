
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      if (data && data.access) {
        login(data.access);
        navigate("/dashboard");
      } else {
        setError("Invalid response from server");
      }

    } catch (err) {
      setError(err.response?.data?.detail || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-green-50">

      {/* Login Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            🌾 Crop AI System
          </h1>
          <p className="text-gray-500 text-sm">
            Smart Crop Recommendation Platform
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-center">
          Sign in to your account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Username
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          AI-powered agriculture decision support
        </p>

      </div>
    </div>
  );
}

