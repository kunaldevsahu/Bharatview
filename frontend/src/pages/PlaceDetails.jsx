import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../services/placeService";

const PlaceDetails = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    fetchPlaceById(id).then(setPlace);
  }, [id]);

  if (!place) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="space-y-20">

      {/* HERO */}
      <section className="relative h-[70vh] rounded-3xl overflow-hidden">
        <img
          src={place.images?.[0]}
          alt={place.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 h-full flex flex-col justify-end p-10">
          <h1 className="text-6xl font-extrabold">{place.name}</h1>
          <p className="text-xl text-gray-200 mt-2">
            {place.city}, {place.state}
          </p>
        </div>
      </section>

      {/* QUICK INFO */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard title="Category" value={place.category?.[0]} />
        <InfoCard title="Budget" value={place.travelInfo?.budget} />
        <InfoCard title="Best Season" value={place.travelInfo?.bestSeason || "All year"} />
      </section>

      {/* DESCRIPTION */}
      <section className="max-w-4xl">
        <h2 className="text-3xl font-bold mb-4">
          About {place.name}
        </h2>
        <p className="text-gray-300 leading-relaxed">
          {place.fullDescription}
        </p>
      </section>

      {/* HISTORY */}
      {place.history && (
        <section className="max-w-4xl">
          <h2 className="text-3xl font-bold mb-4">
            History
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {place.history}
          </p>
        </section>
      )}

      {/* MAP */}
      {place.location?.lat && (
        <section>
          <h2 className="text-3xl font-bold mb-6">
            Location 📍
          </h2>
          <iframe
            className="w-full h-[450px] rounded-2xl"
            loading="lazy"
            src={`https://www.google.com/maps?q=${place.location.lat},${place.location.lng}&z=14&output=embed`}
          />
        </section>
      )}

      {/* NEARBY */}
      {place.nearbyAttractions?.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6">
            Nearby Attractions
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {place.nearbyAttractions.map((item, i) => (
              <li
                key={i}
                className="bg-white/10 p-4 rounded-xl"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-white/10 rounded-2xl p-6">
    <p className="text-gray-400 text-sm mb-1">{title}</p>
    <p className="text-xl font-semibold">
      {value || "—"}
    </p>
  </div>
);

export default PlaceDetails;
