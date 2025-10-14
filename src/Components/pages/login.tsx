import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn }: any = useOutletContext();
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/dashboard/add");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
