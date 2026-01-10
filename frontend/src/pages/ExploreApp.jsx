import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import PlaceCardSkeleton from "../components/PlaceCardSkeleton";
import { fetchPlaces } from "../services/placeService";

const categories = ["Heritage", "Spiritual", "Nature", "Adventure"];

const ExploreApp = () => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPlaces({ search, category }).then((data) => {
      setPlaces(data);
      setLoading(false);
    });
  }, [search, category]);

  return (
    <div className="space-y-16">

      {/* HEADER */}
      <section className="space-y-6">
        <h1 className="text-5xl font-extrabold">
          Explore India 🇮🇳
        </h1>
        <p className="text-gray-400 max-w-2xl">
          Discover heritage, nature, spiritual, and adventure destinations across India.
        </p>

        {/* SEARCH */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search places, cities, or states…"
          className="w-full max-w-xl p-4 rounded-xl bg-white/10 focus:outline-none"
        />
      </section>

      {/* CATEGORY FILTERS */}
      <section className="flex gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === category ? "" : cat)}
            className={`px-6 py-2 rounded-full border transition ${
              category === cat
                ? "bg-orange-500 border-orange-500"
                : "border-white/20 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* GRID */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))
          : places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))}
      </section>

      {!loading && places.length === 0 && (
        <p className="text-gray-400">
          No places found. Try a different search.
        </p>
      )}
    </div>
  );
};

export default ExploreApp;
