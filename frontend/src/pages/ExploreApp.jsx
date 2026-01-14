import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DestinationCard } from '../components/DestinationCard';
import { fetchPlaces } from '../services/placeService';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import { Search, SlidersHorizontal, MapPin } from 'lucide-react';

const categoryList = ['All', 'Heritage', 'Nature', 'Spiritual', 'Adventure', 'Wildlife', 'Beaches', 'Unique'];

export default function ExploreApp() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('All');
    }
  }, [searchParams]);

  useEffect(() => {
    const getDestinations = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (searchTerm) params.search = searchTerm;

        const data = await fetchPlaces(params);
        setDestinations(data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getDestinations, 500);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category !== 'All') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-secondary/5">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-2 tracking-tight">Explore <span className="text-primary">Bharat</span></h1>
          <p className="text-muted-foreground text-lg font-light">
            Discover the diverse beauty across the subcontinent
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-black tracking-widest text-primary bg-primary/5 px-5 py-2 rounded-full border border-primary/10 uppercase">
          <MapPin className="h-3.5 w-3.5" />
          <span>{destinations.length} LOCATIONS FOUND</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-[65px] z-30 bg-white/80 backdrop-blur-md py-4 border-b border-gray-100 -mx-4 px-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary/30 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search by name, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border-secondary/5 rounded-2xl focus:border-primary focus:ring-primary/10 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar lg:pb-0">
            <SlidersHorizontal className="h-4 w-4 text-gray-400 mr-2 hidden lg:block" />
            {categoryList.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(category)}
                className={`h-11 px-8 rounded-full whitespace-nowrap transition-all font-bold tracking-tight ${selectedCategory === category
                  ? 'bg-secondary hover:bg-secondary/90 text-white border-none shadow-lg shadow-secondary/20'
                  : 'text-secondary/60 hover:text-primary hover:border-primary hover:bg-primary/5 border-secondary/10'
                  }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-20 w-full" />
              <div className="flex justify-between items-center pt-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      ) : destinations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination._id || destination.id} destination={destination} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900">No destinations found</h3>
          <p className="text-gray-500 mt-2 max-w-sm mx-auto">
            We couldn't find any places matching "{searchTerm}". Try adjusting your filters or search terms.
          </p>
          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSearchParams({});
            }}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white border-none"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
