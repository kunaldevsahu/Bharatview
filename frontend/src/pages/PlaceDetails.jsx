import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPlaceById } from '../services/placeService';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { useSavedPlaces } from '../contexts/SavedPlacesContext';
import {
  MapPin,
  Star,
  Heart,
  DollarSign,
  Info,
  Clock,
  Map,
  Navigation,
  ChevronLeft,
  Loader2
} from 'lucide-react';

export default function PlaceDetails() {
  const { id } = useParams();
  const { isSaved, toggleSavedPlace } = useSavedPlaces();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlace = async () => {
      setLoading(true);
      try {
        const data = await fetchPlaceById(id);
        setDestination(data);
      } catch (error) {
        console.error("Failed to fetch place details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) getPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">📍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Destination not found</h1>
          <p className="text-gray-500 mb-6">The place you're looking for doesn't exist in our records.</p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white border-none">
            <Link to="/app/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  const saved = isSaved(destination._id || destination.id);
  const rating = destination.rating || 4.5;
  const description = destination.fullDescription || destination.description || destination.shortDescription;
  const budget = destination.travelInfo?.budget || destination.budget;
  const lat = destination.location?.lat || destination.latitude;
  const lng = destination.location?.lng || destination.longitude;

  return (
    <div className="space-y-8 -mt-8 -mx-4 md:-mx-8">
      {/* Hero Image Section */}
      <div className="relative h-[400px] md:h-[550px] overflow-hidden">
        <ImageWithFallback
          src={destination.images?.[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-10">
          <Button asChild variant="secondary" className="bg-white/10 backdrop-blur-xl border-white/20 text-white hover:bg-white hover:text-secondary transition-all rounded-full px-6">
            <Link to="/app/explore" className="flex items-center gap-2 font-bold tracking-widest text-[10px] uppercase">
              <ChevronLeft className="h-4 w-4" />
              <span>Explore</span>
            </Link>
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 text-white">
          <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
            <Badge className="bg-primary text-white border-none px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              {destination.category?.[0] || destination.category}
            </Badge>
            <h1 className="text-5xl md:text-8xl font-black mb-2 tracking-tighter">
              {destination.name}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/80 font-medium">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg uppercase tracking-wider">{destination.city}, {destination.state}</span>
              </div>
              <div className="h-1.5 w-1.5 bg-primary rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-primary fill-primary' : 'text-white/20 fill-white/20'}`} />
                  ))}
                </div>
                <span className="text-lg font-black">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 md:px-0 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Rating</p>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    <span className="text-2xl font-bold text-gray-900">{destination.rating}</span>
                  </div>
                </div>
                <div className="w-px bg-gray-100"></div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Category</p>
                  <p className="text-xl font-bold text-gray-900">{destination.category?.[0] || destination.category}</p>
                </div>
              </div>
              <Button
                onClick={() => toggleSavedPlace(destination._id || destination.id)}
                variant={saved ? "secondary" : "outline"}
                className={`flex items-center gap-2 h-12 px-6 rounded-xl transition-all ${saved ? "bg-red-50 text-red-600 border-red-100" : "hover:border-red-600 hover:text-red-600 hover:bg-red-50"
                  }`}
              >
                <Heart
                  className={`h-5 w-5 transition-colors ${saved ? 'fill-red-500 text-red-500' : ''
                    }`}
                />
                <span className="font-semibold">{saved ? 'Saved' : 'Save to List'}</span>
              </Button>
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight">About <span className="text-primary">Destination</span></h2>
                <div className="h-px flex-1 bg-secondary/5"></div>
              </div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-secondary/5 shadow-sm">
                <p className="text-secondary/70 leading-relaxed text-xl font-light">
                  {description}
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Historical <span className="text-primary">Significance</span></h2>
                <div className="h-px flex-1 bg-secondary/5"></div>
              </div>
              <div className="bg-accent/30 p-10 rounded-[2.5rem] border border-accent">
                <p className="text-accent-foreground leading-relaxed text-xl font-medium py-4 border-l-4 border-primary pl-8">
                  "{destination.history}"
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Navigation className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Nearby Gems</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {destination.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:border-orange-200 transition-colors group">
                    <div className="h-10 w-10 bg-gray-50 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-50 transition-colors">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-gray-800">{attraction}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white border-secondary/5 shadow-sm rounded-[2.5rem] overflow-hidden">
              <CardContent className="p-10 space-y-10">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-secondary tracking-tight">Estimated Budget</h3>
                  <div className="bg-accent/40 p-5 rounded-2xl border border-accent">
                    <p className="text-accent-foreground font-black text-lg">{budget}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-secondary tracking-tight">Travel Smart</h3>
                  <p className="text-secondary/60 text-sm leading-relaxed font-medium">
                    {destination.travelInfo}
                  </p>
                </div>

                <div className="pt-8 border-t border-secondary/5">
                  <h3 className="text-xl font-bold mb-6 text-secondary tracking-tight">Location Map</h3>
                  <div className="aspect-square bg-secondary/5 rounded-[2rem] relative overflow-hidden group cursor-pointer border border-secondary/10">
                    <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+f44336(${lng},${lat})/${lng},${lat},10/400x400?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHozN282ZzB6bmxtNmoifQ==')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-80"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-secondary rounded-[2.5rem] p-10 text-white space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/40 transition-all"></div>
              <h3 className="text-2xl font-bold tracking-tight">Plan with Ease</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Get a hand-crafted itinerary for {destination.name} with our AI curator.
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white border-none h-14 rounded-2xl shadow-lg shadow-primary/20">
                <Link to="/app/indibot" className="font-black uppercase tracking-widest text-xs">Begin Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
