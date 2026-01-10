import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockAIResponse = [
  {
    id: 1,
    name: "Taj Mahal",
    category: "Heritage",
    location: "Agra, Uttar Pradesh",
    description: "Iconic marble mausoleum and symbol of love.",
  },
  {
    id: 2,
    name: "Varanasi",
    category: "Spiritual",
    location: "Uttar Pradesh",
    description: "One of the oldest living cities in the world.",
  },
];

const IndiBotApp = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleDiscover = () => {
    if (!query) return;
    // 🔥 Later this will call backend AI
    setResults(mockAIResponse);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      <h2 className="text-4xl font-bold">IndiBot 🤖</h2>
      <p className="text-gray-300">
        Ask me about tourism places in India.
      </p>

      {/* INPUT */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="e.g. Heritage places in Rajasthan"
          className="flex-1 p-4 rounded bg-white/10 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleDiscover}
          className="bg-orange-500 px-6 rounded font-semibold"
        >
          Discover
        </button>
      </div>

      {/* RESULTS */}
      <div className="space-y-6">
        {results.map((place) => (
          <div
            key={place.id}
            className="bg-white/10 p-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{place.name}</h3>
              <p className="text-sm text-gray-300">
                {place.category} • {place.location}
              </p>
              <p className="mt-2">{place.description}</p>
            </div>

            <button
              onClick={() => navigate(`/app/place/${place.id}`)}
              className="bg-orange-500 px-4 py-2 rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default IndiBotApp;
