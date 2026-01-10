import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};

const HomeApp = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Spiritual", icon: "🛕", color: "from-orange-400 to-red-500" },
    { name: "Adventure", icon: "🏔", color: "from-blue-400 to-cyan-500" },
    { name: "Heritage", icon: "🏰", color: "from-amber-400 to-yellow-500" },
    { name: "Nature", icon: "🌿", color: "from-green-400 to-emerald-500" },
  ];

  const trendingPlaces = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop",
      rating: "4.9",
    },
    {
      id: 2,
      name: "Varanasi Ghats",
      location: "Uttar Pradesh",
      image: "https://images.unsplash.com/photo-1561361513-35e6e9c9bea2?q=80&w=1000&auto=format&fit=crop",
      rating: "4.8",
    },
    {
      id: 3,
      name: "Hampi Ruins",
      location: "Karnataka",
      image: "https://images.unsplash.com/photo-1620766165457-a80da47ddf79?q=80&w=1000&auto=format&fit=crop",
      rating: "4.7",
    },
    {
      id: 4,
      name: "Kerala Backwaters",
      location: "Alleppey",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop",
      rating: "4.9",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-12 pb-10"
    >
      {/* CINEMATIC HERO */}
      <motion.section
        variants={itemVariants}
        className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group border-glow"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
          alt="India"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, transition: { duration: 0.8 } }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12">
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-6xl font-black mb-4 leading-tight"
            >
              Discover <span className="text-gradient-accent">Incredible India</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl font-light"
            >
              Unearth the hidden gems, ancient stories, and vibrant cultures that make Bharat truly unique.
            </motion.p>
            <motion.button
              onClick={() => navigate("/app/explore")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
            >
              Start Exploring
            </motion.button>
          </div>
        </div>
      </motion.section>

      {/* CATEGORIES */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="text-2xl font-bold">Explore by Category</h3>
          <button className="text-orange-500 font-medium hover:text-orange-400">View All</button>
        </div>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="glass-panel p-6 rounded-2xl cursor-pointer group hover:bg-white/5 transition-colors"
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {cat.icon}
              </div>
              <h4 className="text-lg font-bold">{cat.name}</h4>
              <p className="text-sm text-gray-400">100+ Places</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* TRENDING PLACES */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Trending Destinations</h3>
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trendingPlaces.map((place) => (
            <motion.div
              key={place.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => navigate(`/app/place/${place.id}`)}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-yellow-400 flex items-center gap-1">
                  ★ {place.rating}
                </div>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-bold mb-1 group-hover:text-orange-500 transition-colors">
                  {place.name}
                </h4>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <span className="mr-1">📍</span> {place.location}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HomeApp;
