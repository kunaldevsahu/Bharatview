import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import PlaceCardSkeleton from "../components/PlaceCardSkeleton";
import { fetchPlaces } from "../services/placeService";

const ExploreApp = () => {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        const data = await fetchPlaces({ search });
        setPlaces(data);
      } catch (err) {
        console.error("Failed to fetch places", err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [search]);

  return (
    <div>
      {/* TITLE */}
      <h2 className="text-4xl font-bold mb-8">Explore India 🇮🇳</h2>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search places..."
        className="p-3 rounded bg-white/10 mb-10 w-full md:w-1/3"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <PlaceCardSkeleton key={i} />
            ))
          : places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))}
      </div>

      {/* EMPTY STATE */}
      {!loading && places.length === 0 && (
        <p className="text-gray-400 mt-10">
          No places found. Try a different search.
        </p>
      )}
    </div>
  );
};

export default ExploreApp;
