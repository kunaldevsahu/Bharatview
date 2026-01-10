import { NavLink } from "react-router-dom";

const AppNavbar = () => {
  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 transition-colors duration-300 font-medium ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    }`;

  const activeIndicator = (isActive) =>
    isActive ? (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_10px_rgba(255,94,58,0.7)]" />
    ) : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass-panel border-b border-white/5">
      {/* Logo Area */}
      <div className="text-2xl font-bold tracking-tighter">
        <span className="text-white">Bharat</span>
        <span className="text-gradient-accent">View</span>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-2 bg-black/20 p-1 rounded-full border border-white/5 backdrop-blur-md">
        <NavLink to="/app" end className={linkClass}>
          {({ isActive }) => (
            <>
              Home
              {activeIndicator(isActive)}
            </>
          )}
        </NavLink>

        <NavLink to="/app/explore" className={linkClass}>
          {({ isActive }) => (
            <>
              Explore
              {activeIndicator(isActive)}
            </>
          )}
        </NavLink>

        <NavLink to="/app/saved" className={linkClass}>
          {({ isActive }) => (
            <>
              Saved
              {activeIndicator(isActive)}
            </>
          )}
        </NavLink>

        <NavLink to="/app/indibot" className={linkClass}>
          {({ isActive }) => (
            <>
              IndiBot 🤖
              {activeIndicator(isActive)}
            </>
          )}
        </NavLink>
      </div>

      {/* User Profile / Action */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg border border-white/20"></div>
    </nav>
  );
};

export default AppNavbar;
