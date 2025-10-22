import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username,
        password,
      });

      // ✅ Expecting backend to return token + user info
      if (res.status === 200) {
        const { token, user } = res.data;

        // Save credentials
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role || "user");

        alert("✅ Login successful!");
        navigate("/dashboard/view"); // Redirect to view dashboard
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      if (err.response?.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 rounded-md p-2 text-center mb-4">
            {error}
          </p>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-gray-400 text-center mt-4">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/dashboard/register")}
            className="text-blue-400 hover:text-blue-500"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
