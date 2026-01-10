import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1598503258605-05f3196e1984?q=80&w=2070&auto=format&fit=crop"
            alt="India Heritage"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl px-4 animate-fade-in">
          <div className="mb-4 inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium tracking-wide text-orange-400">
            ✨ Experience Incredible India
          </div>
          <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight leading-none font-display">
            Bharat<span className="text-gradient-accent">View.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed tracking-wide font-sans">
            Discover the soul of India through its majestic heritage, spiritual
            sanctuaries, and breathtaking landscapes.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Start Exploring
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all hover:scale-105"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 px-6 relative z-10 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-gradient-accent">BharatView?</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Unlock the secrets of India with our premium travel companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🏰"
              title="Heritage & Culture"
              desc="Dive deep into the rich history of ancient monuments and cultural landmarks."
            />
            <FeatureCard
              icon="🤖"
              title="AI Guide (IndiBot)"
              desc="Your personal AI travel assistant. Ask anything, anytime, anywhere."
            />
            <FeatureCard
              icon="📍"
              title="Curated Places"
              desc="Handpicked destinations that offer the most authentic Indian experience."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-black text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} BharatView. Made with ❤️ for India.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card p-10 rounded-2xl group cursor-pointer hover:bg-white/5">
    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
