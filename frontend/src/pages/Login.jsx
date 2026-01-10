import { useState } from "react";
import { loginUser } from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/app";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full p-3 mb-4 rounded text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 py-3 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
