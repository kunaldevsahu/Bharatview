import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService";
import PlaceCard from "../components/PlaceCard";

const SavedPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await getFavorites();
        setPlaces(data);
      } catch (err) {
        console.error("Failed to load saved places", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading saved places...</p>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">Saved Places ❤️</h2>

      {places.length === 0 ? (
        <p className="text-gray-400">
          You haven’t saved any places yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {places.map((place) => (
            <PlaceCard key={place._id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPlaces;
