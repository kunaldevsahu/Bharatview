import { useNavigate } from "react-router-dom";

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();


  if (!place) {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-[50vh] bg-white/10 rounded-xl"></div>
      <div className="h-6 bg-white/10 w-1/2 rounded"></div>
      <div className="h-4 bg-white/10 w-full rounded"></div>
    </div>
  );
}


  return (
    <div
      onClick={() => navigate(`/app/place/${place._id}`)}
      className="bg-white/10 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition"
    >
      <img
        src={place.images?.[0]}
        alt={place.name}
        className="h-44 w-full object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold">{place.name}</h3>
        <p className="text-sm text-gray-300">
          {place.city}, {place.state}
        </p>
        <p className="text-sm mt-2 text-gray-400">
          {place.shortDescription}
        </p>
      </div>
    </div>
  );
};

export default PlaceCard;
