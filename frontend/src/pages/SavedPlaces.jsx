import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlaceById, fetchPlaces } from '../services/placeService';
import { useSavedPlaces } from '../contexts/SavedPlacesContext';
import { DestinationCard } from '../components/DestinationCard';
import { Button } from '../components/ui/button';
import { Heart, MapPin, Compass, Loader2 } from 'lucide-react';

export default function SavedPlaces() {
  const { savedPlaces } = useSavedPlaces();
  const [savedDestinations, setSavedDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSavedData = async () => {
      setLoading(true);
      try {
        // Fetch saved places
        const savedPromises = savedPlaces.map(id => fetchPlaceById(id).catch(e => null));
        const savedResults = await Promise.all(savedPromises);
        setSavedDestinations(savedResults.filter(Boolean));

        // Fetch recommendations if needed
        if (savedPlaces.length < 3) {
          const recommended = await fetchPlaces({ top: true });
          setRecommendedDestinations(recommended.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch saved places:", error);
      } finally {
        setLoading(false);
      }
    };

    getSavedData();
  }, [savedPlaces]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            My Saved Places
          </h1>
          <p className="text-gray-500 mt-1">
            Build your dream itinerary by saving your favorite Indian destinations
          </p>
        </div>
        {savedDestinations.length > 0 && (
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-bold text-gray-700">{savedDestinations.length} Places Pointed</span>
          </div>
        )}
      </div>

      {/* Saved Destinations Content */}
      {savedDestinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDestinations.map((destination) => (
            <DestinationCard key={destination._id || destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-white p-6 rounded-full shadow-lg mb-6">
            <Heart className="h-16 w-16 text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your collection is empty</h2>
          <p className="text-gray-500 max-w-md mb-8">
            You haven't saved any destinations yet. Discover the beauty of Bharat and start adding places to your list!
          </p>
          <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white border-none shadow-md shadow-orange-600/20 px-8">
            <Link to="/app/explore" className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              <span>Explore Bharat</span>
            </Link>
          </Button>
        </div>
      )}

      {/* Recommended Section (If empty or few) */}
      {savedDestinations.length < 3 && (
        <div className="pt-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedDestinations.map((dest) => (
              <DestinationCard key={dest._id || dest.id} destination={dest} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
