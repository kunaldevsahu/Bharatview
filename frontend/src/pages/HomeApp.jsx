import { useNavigate } from "react-router-dom";

const HomeApp = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">

      {/* HERO */}
      <section className="relative h-[60vh] rounded-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada"
          alt="India"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-12">
          <h2 className="text-5xl font-extrabold mb-4">
            Discover Incredible India 🇮🇳
          </h2>
          <p className="text-xl max-w-2xl">
            Explore iconic landmarks, hidden gems, and cultural heritage
            across Bharat.
          </p>
          <button
            onClick={() => navigate("/app/explore")}
            className="mt-6 w-fit bg-orange-500 px-6 py-3 rounded-full font-semibold"
          >
            Explore Places
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h3 className="text-3xl font-bold mb-6">Explore by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            "Spiritual 🛕",
            "Adventure 🏔",
            "Heritage 🏰",
            "Nature 🌿",
          ].map((cat) => (
            <div
              key={cat}
              className="bg-white/10 p-8 rounded-xl text-center hover:bg-white/20 cursor-pointer"
            >
              <h4 className="text-xl font-semibold">{cat}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section>
        <h3 className="text-3xl font-bold mb-6">Trending Places</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {["Taj Mahal", "Varanasi", "Hampi", "Kerala"].map((place) => (
            <div
              key={place}
              className="bg-white/10 rounded-xl overflow-hidden hover:scale-105 transition cursor-pointer"
            >
              <div className="h-40 bg-slate-700"></div>
              <div className="p-4 font-semibold">{place}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default HomeApp;
