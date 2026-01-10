import { NavLink, useNavigate } from "react-router-dom";

const AppNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-orange-400 font-semibold"
      : "hover:text-orange-300";

  return (
    <nav className="w-full h-16 bg-slate-900 border-b border-white/10 px-10 flex items-center justify-between">

      {/* Logo */}
      <h1
        onClick={() => navigate("/app/home")}
        className="text-2xl font-bold cursor-pointer"
      >
        Bharat<span className="text-orange-500">View</span>
      </h1>

      {/* Navigation */}
      <div className="flex gap-10 text-lg">
        <NavLink to="/app/home" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/app/explore" className={linkClass}>
          Explore
        </NavLink>
        <NavLink to="/app/saved" className={linkClass}>
          Saved ❤️
        </NavLink>

        <NavLink to="/app/indibot" className={linkClass}>
          IndiBot
        </NavLink>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-500 px-5 py-2 rounded text-sm font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default AppNavbar;
