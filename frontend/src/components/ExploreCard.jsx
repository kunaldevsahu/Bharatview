 const ExploreCard = ({ title, image }) => {
  return (
    <div className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default ExploreCard;
