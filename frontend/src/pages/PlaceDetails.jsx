import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../services/placeService";
import { toggleFavorite } from "../services/favoriteService";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadPlace = async () => {
      try {
        const data = await fetchPlaceById(id);
        setPlace(data);
      } catch (err) {
        console.error("Failed to load place", err);
      }
    };

    loadPlace();
  }, [id]);

  const handleFavorite = async () => {
    try {
      setSaving(true);
      await toggleFavorite(place._id);
      alert("Place saved to favorites ❤️");
    } catch (err) {
      console.error("Failed to save favorite", err);
      alert("Please login to save places");
    } finally {
      setSaving(false);
    }
  };

  if (!place) {
    return <p className="text-center text-gray-400">Loading place...</p>;
  }

  return (
    <div className="space-y-14">

      {/* HERO IMAGE */}
      <div className="h-[60vh] rounded-2xl overflow-hidden">
        <img
          src={place.images?.[0]}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TITLE + SAVE */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h1 className="text-5xl font-extrabold">{place.name}</h1>

        <button
          onClick={handleFavorite}
          disabled={saving}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-semibold disabled:opacity-60"
        >
          ❤️ {saving ? "Saving..." : "Save Place"}
        </button>
      </div>

      {/* SHORT INFO */}
      <p className="text-gray-400 text-lg">
        {place.city}, {place.state} •{" "}
        {place.category?.join(", ")}
      </p>

      {/* DESCRIPTION */}
      <section>
        <h2 className="text-3xl font-bold mb-4">About</h2>
        <p className="text-gray-300 max-w-4xl leading-relaxed">
          {place.fullDescription}
        </p>
      </section>

      {/* HISTORY */}
      {place.history && (
        <section>
          <h2 className="text-3xl font-bold mb-4">History</h2>
          <p className="text-gray-300 leading-relaxed">
            {place.history}
          </p>
        </section>
      )}

      {/* TRAVEL INFO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-xl">
          <h4 className="font-semibold mb-2">Budget</h4>
          <p>{place.travelInfo?.budget || "Not specified"}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h4 className="font-semibold mb-2">Best Time</h4>
          <p>{place.bestTime || "All year"}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h4 className="font-semibold mb-2">Duration</h4>
          <p>{place.duration || "Flexible"}</p>
        </div>
      </section>

      {/* MAP */}
      {place.location?.lat && place.location?.lng && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Location 📍</h2>
          <iframe
            title="map"
            className="w-full h-[420px] rounded-xl"
            loading="lazy"
            src={`https://www.google.com/maps?q=${place.location.lat},${place.location.lng}&z=15&output=embed`}
          />
        </section>
      )}

      {/* HOW TO REACH */}
      {place.howToReach && (
        <section>
          <h2 className="text-3xl font-bold mb-4">How to Reach</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            {place.howToReach.road && <li>🛣 {place.howToReach.road}</li>}
            {place.howToReach.rail && <li>🚆 {place.howToReach.rail}</li>}
            {place.howToReach.air && <li>✈️ {place.howToReach.air}</li>}
          </ul>
        </section>
      )}

      {/* NEARBY ATTRACTIONS */}
      {place.nearbyAttractions?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Nearby Attractions</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-1">
            {place.nearbyAttractions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
};

export default PlaceDetails;
