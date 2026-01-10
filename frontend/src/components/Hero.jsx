import ImageSlider from "./ImageSlider";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen flex items-center justify-center text-center">
      <ImageSlider />

      <div className="relative z-10 max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide">
          DISCOVER <span className="text-orange-500">BHARAT</span> 🇮🇳
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-200">
          The AI-Driven Soul of Indian Exploration
        </p>

        <div className="mt-10 flex gap-6 justify-center">
          <button
            onClick={() => navigate("/register")}
            className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full text-lg font-semibold"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/app")}
            className="border border-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-black"
          >
            Explore Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
