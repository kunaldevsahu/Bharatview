import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();

  if (!place) {
    return (
      <div className="aspect-[4/5] bg-zinc-900 rounded-lg animate-pulse" />
    );
  }

  return (
    <div
      onClick={() => navigate(`/app/place/${place._id}`)}
      className="glass-card rounded-lg overflow-hidden cursor-pointer group"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={place.images?.[0] || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800'}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mb-1">
            <FaStar size={10} />
            {place.rating || "4.5"}
          </div>
          <h3 className="card-title text-white mb-1 group-hover:text-orange-400 transition-colors line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <FaMapMarkerAlt size={8} />
            <span className="line-clamp-1">{place.city}, {place.state}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
