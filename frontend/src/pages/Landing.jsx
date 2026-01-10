import { useState } from "react";
import { askIndiBot } from "../services/indibotService";
import { useNavigate } from "react-router-dom";

const IndiBotApp = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDiscover = async () => {
    if (!query) return;
    setLoading(true);
    const data = await askIndiBot(query);
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <h2 className="text-4xl font-bold">IndiBot 🤖</h2>
      <p className="text-gray-300">
        Ask me about tourism places in India.
      </p>

      <div className="flex gap-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Heritage places in Agra"
          className="flex-1 p-4 rounded bg-white/10"
        />
        <button
          onClick={handleDiscover}
          className="bg-orange-500 px-6 rounded font-semibold"
        >
          Discover
        </button>
      </div>

      {loading && <p>Thinking… 🤖</p>}

      <div className="space-y-6">
        {results.map((place) => (
          <div
            key={place._id}
            className="bg-white/10 p-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{place.name}</h3>
              <p className="text-gray-300">
                {place.city}, {place.state}
              </p>
              <p className="mt-2 text-gray-400">
                {place.shortDescription}
              </p>
            </div>

            <button
              onClick={() => navigate(`/app/place/${place._id}`)}
              className="bg-orange-500 px-4 py-2 rounded"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndiBotApp;
