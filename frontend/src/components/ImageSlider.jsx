import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1548013146-72479768bada", // Taj Mahal
  "https://images.unsplash.com/photo-1589308078055-ebd6d6c2d3f1", // Varanasi
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470", // Ladakh
  "https://images.unsplash.com/photo-1602153508753-9a4c2f4f5b9c"  // Kerala
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="India Travel"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};

export default ImageSlider;
