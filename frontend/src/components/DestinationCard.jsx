import { Link } from 'react-router-dom';
import { Heart, MapPin, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useSavedPlaces } from '../contexts/SavedPlacesContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function DestinationCard({ destination }) {
  const { isSaved, toggleSavedPlace } = useSavedPlaces();
  const id = destination._id || destination.id;
  const saved = isSaved(id);
  const imageUrl = destination.images?.[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523';
  const category = destination.category?.[0] || destination.category;

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white border-secondary/5 rounded-[2rem]">
      <Link to={`/app/place/${id}`}>
        <div className="relative h-56 overflow-hidden">
          <ImageWithFallback
            src={imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <Badge className="absolute top-4 left-4 bg-white/90 text-secondary border-none shadow-sm backdrop-blur-md font-bold text-[10px] tracking-widest uppercase px-3">
            {category}
          </Badge>
          <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </Link>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Link to={`/app/place/${id}`} className="flex-1">
            <h3 className="text-2xl font-bold text-secondary hover:text-primary transition-colors leading-tight tracking-tight">
              {destination.name}
            </h3>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              toggleSavedPlace(id);
            }}
            className="flex-shrink-0 h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Heart
              className={`h-5 w-5 transition-all ${saved ? 'fill-primary text-primary scale-110' : 'text-secondary/30'
                }`}
            />
          </Button>
        </div>

        <div className="flex items-center text-xs font-bold tracking-wider text-secondary/40 mb-4 uppercase">
          <MapPin className="h-3 w-3 mr-1 text-primary" />
          {destination.city}, {destination.state}
        </div>

        {destination.nearbyAttractions && destination.nearbyAttractions.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {destination.nearbyAttractions.slice(0, 3).map((attraction, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2.5 py-1 bg-accent/30 rounded-full text-accent-foreground font-bold tracking-tight"
                >
                  {attraction}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-secondary/5">
          <div className="flex items-center">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(destination.rating || 4.5) ? 'text-primary fill-primary' : 'text-secondary/10 fill-secondary/10'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs font-black text-secondary/70">{destination.rating || 4.5}</span>
          </div>
          <Link to={`/app/place/${id}`}>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:tracking-[0.3em] transition-all">
              Details
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
