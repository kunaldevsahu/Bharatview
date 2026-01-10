import { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [form, setForm] = useState({});

  const handleRegister = async () => {
    try {
      await registerUser(form);
      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white/10 p-8 rounded-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>

        <input
          className="w-full p-3 mb-4 rounded text-black"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="w-full p-3 mb-4 rounded text-black"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full p-3 mb-6 rounded text-black"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 py-3 rounded"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Register;
