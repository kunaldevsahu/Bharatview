import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      setError("Please fill all fields");
      return;
    }
    try {
      await registerUser(form);
      window.location.href = "/login";
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />

      <div className="glass-card p-10 rounded-2xl w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400">Join our community of explorers</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-red-400 text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
            <input
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              placeholder="Create a password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-orange-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Account
          </button>
        </div>

        <p className="text-gray-400 text-center mt-8 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
