const PlaceCardSkeleton = () => {
  return (
    <div className="bg-white/10 rounded-xl overflow-hidden animate-pulse">
      <div className="h-44 bg-white/20"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
        <div className="h-3 bg-white/20 rounded w-full"></div>
        <div className="h-3 bg-white/20 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default PlaceCardSkeleton;
