import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID =
  "965379596061-r3r4k080q1i1042nik0o4bhllah528bu.apps.googleusercontent.com";

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ If already logged in, redirect to dashboard
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/dashboard");
  }, [navigate]);

  // ✅ Handle successful Google login
  const handleLoginSuccess = (response: CredentialResponse) => {
    try {
      if (!response.credential) {
        console.error("No credential found in Google response");
        return;
      }

      const userInfo: any = jwtDecode(response.credential);
      console.log("✅ Google user:", userInfo);

      // ✅ Assign admin or user role
      if (userInfo.email === "hamza.slysol@gmail.com") {
        localStorage.setItem("role", "admin");
      } else {
        localStorage.setItem("role", "user");
      }

      localStorage.setItem("user", JSON.stringify(userInfo));
      localStorage.setItem("token", response.credential);

      navigate("/dashboard");
    } catch (err) {
      console.error("Error decoding Google login response:", err);
    }
  };

  const handleLoginError = () => {
    alert("❌ Google login failed. Please try again.");
  };

  // ✅ Handle logout (optional)
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/dashboard/login");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-[400px] text-center">
          <h2 className="text-3xl font-bold mb-6">Admin Login</h2>

          {/* ✅ Google Login Button */}
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            theme="outline"
            size="large"
            text="signin_with"
            shape="rectangular"
          />

          {/* ✅ Logout button if user already logged in */}
          {localStorage.getItem("user") && (
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
