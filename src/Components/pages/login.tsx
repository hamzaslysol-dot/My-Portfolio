import Sidebar from "../sideBar";

export default function Login() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex items-center justify-center h-screen">
        <form className="bg-gray-100 p-6 rounded-lg shadow w-80">
          <h1 className="text-2xl font-bold mb-4 text-center">🔐 Login</h1>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
          />
          <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
