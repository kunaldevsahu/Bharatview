import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-30 px-8 py-4 flex items-center justify-between bg-black/30 backdrop-blur-md">
      
      {/* Logo */}
      <div
        onClick={() => scrollTo("home")}
        className="text-2xl font-bold cursor-pointer"
      >
        Bharat<span className="text-orange-500">View</span>
      </div>

      {/* Center links */}
      <div className="hidden md:flex gap-8 text-lg">
        <button
          onClick={() => scrollTo("home")}
          className="hover:text-orange-400"
        >
          Home
        </button>

        <button
          onClick={() => scrollTo("explore")}
          className="hover:text-orange-400"
        >
          Explore
        </button>
      </div>

      {/* Auth actions */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate("/login")}
          className="hover:text-orange-400"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full font-semibold"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
