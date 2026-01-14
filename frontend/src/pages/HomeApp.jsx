import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DestinationCard } from '../components/DestinationCard';
import { fetchPlaces } from '../services/placeService';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Mountain, Church, Palmtree, TentTree, ArrowRight, Loader2, Sparkles, Bot } from 'lucide-react';

const categories = [
  {
    name: 'Heritage',
    icon: Church,
    color: 'from-orange-500/10 to-transparent',
    borderColor: 'border-orange-200',
    filter: 'Heritage'
  },
  {
    name: 'Nature',
    icon: Palmtree,
    color: 'from-green-500/10 to-transparent',
    borderColor: 'border-green-200',
    filter: 'Nature'
  },
  {
    name: 'Spiritual',
    icon: Mountain,
    color: 'from-purple-500/10 to-transparent',
    borderColor: 'border-purple-200',
    filter: 'Spiritual'
  },
  {
    name: 'Adventure',
    icon: TentTree,
    color: 'from-blue-500/10 to-transparent',
    borderColor: 'border-blue-200',
    filter: 'Adventure'
  },
];

const featuredRegions = [
  { name: 'Cultural North', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1080', state: 'Uttar Pradesh' },
  { name: 'Tropical South', image: 'https://images.unsplash.com/photo-1707893013488-51672ef83425?auto=format&fit=crop&q=80&w=1080', state: 'Kerala' },
  { name: 'Royal West', image: 'https://plus.unsplash.com/premium_photo-1661963054563-ce928e477ff3?q=80&w=2070&auto=format&fit=crop', state: 'Rajasthan' },
  { name: 'Scenic East', image: 'https://images.unsplash.com/photo-1721140175873-2e664cb286ca?q=80&w=1035&auto=format&fit=crop', state: 'West Bengal' },
];

export default function HomeApp() {
  const [topDestinations, setTopDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopPlaces = async () => {
      try {
        const data = await fetchPlaces({ top: true });
        setTopDestinations(data.slice(0, 6));
      } catch (error) {
        console.error("Failed to fetch top places:", error);
      } finally {
        setLoading(false);
      }
    };
    getTopPlaces();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section - Editorial Style */}
      <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl bg-secondary h-[600px] flex items-end">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200&auto=format&fit=crop&q=80"
            alt="Bharat"
            className="w-full h-full object-cover origin-center animate-ken-burns scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 p-12 md:p-20 w-full animate-slide-up">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-white text-6xl md:text-8xl font-black mb-2 drop-shadow-sm leading-none tracking-tighter">
              Explore <span className="text-primary">Bharat</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light max-w-xl leading-relaxed">
              Where ancient traditions meet modern wonders. Discover the soul of a subcontinent that defies definition.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-6">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white border-none px-10 py-8 text-xl rounded-full shadow-xl shadow-primary/20 transition-transform hover:-translate-y-1">
                <Link to="/app/explore">Begin Journey</Link>
              </Button>
              <Link to="/app/indibot" className="flex items-center gap-3 text-white font-semibold group/link">
                <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover/link:bg-white group-hover/link:text-secondary transition-all">
                  🤖
                </span>
                Plan with AI
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Collections - Bento Grid Style */}
      <section className="animate-slide-up [animation-delay:200ms]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">Curated <span className="text-primary">Collections</span></h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've hand-picked the most essential experiences to help you find your path through Bharat.
            </p>
          </div>
          <Button asChild variant="ghost" className="text-secondary font-bold text-lg group">
            <Link to="/app/explore" className="flex items-center gap-2">
              View All Paths <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 h-[800px] md:h-[600px] gap-4">
          {/* Heritage - Large Callout */}
          <Link
            to={`/app/explore?category=Heritage`}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1080"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-4 backdrop-blur-md">Legacy & Lore</Badge>
              <h3 className="text-4xl font-bold mb-2">Heritage</h3>
              <p className="text-white/70 max-w-xs group-hover:text-white transition-colors">Step into the history that carved the nation's identity.</p>
            </div>
          </Link>

          {/* Nature - Mid Wide */}
          <Link
            to={`/app/explore?category=Nature`}
            className="md:col-span-2 md:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1516690553959-71a414d6b9b6?auto=format&fit=crop&q=80&w=1080"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-1">Nature</h3>
              <p className="text-white/70 text-sm">Prinstine landscapes redefined.</p>
            </div>
          </Link>

          {/* Spiritual - Square */}
          <Link
            to={`/app/explore?category=Spiritual`}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1623059508779-2542c6e83753?auto=format&fit=crop&q=80&w=1080"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white text-center w-full">
              <h3 className="text-2xl font-bold">Spiritual</h3>
            </div>
          </Link>

          {/* Adventure - Square */}
          <Link
            to={`/app/explore?category=Adventure`}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1606857090627-27ca46667290?q=80&w=2067&auto=format&fit=crop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white text-center w-full">
              <h3 className="text-2xl font-bold">Adventure</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Regions of India - Refined Glassmorphism */}
      <section className="bg-accent/40 -mx-4 px-4 py-24 md:-mx-20 md:px-20 rounded-[4rem] animate-slide-up [animation-delay:400ms]">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-secondary">
          <div className="flex-1 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">Regional <span className="">Wonders</span></h2>
            <p className="text-lg text-secondary/70 max-w-xl leading-relaxed">
              From the snow-capped peaks of the North to the tropical shores of the South, explore every corner of the subcontinent.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredRegions.map((region) => (
            <Link
              key={region.name}
              to={`/app/explore?search=${region.state}`}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-secondary/5 p-3"
            >
              <div className="relative h-60 overflow-hidden rounded-[2rem] mb-6">
                <ImageWithFallback
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="px-5 pb-6">
                <h3 className="text-2xl font-bold text-secondary mb-1">{region.name}</h3>
                <p className="text-sm text-secondary/50 font-medium tracking-wide flex items-center">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  {region.state.toUpperCase()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Destinations Section */}
      <section className="animate-slide-up [animation-delay:600ms]">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Top <span className="text-primary">Picks</span></h2>
          <Button asChild variant="outline" className="rounded-full border-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-colors px-8 py-6 h-auto">
            <Link to="/app/explore" className="flex items-center gap-2 font-bold uppercase tracking-wider text-xs">
              View Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {topDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Featured Experience - IndiBot Reimagined */}
      <section className="relative overflow-hidden rounded-[3rem] glass-card p-12 md:p-24 group">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10 animate-pulse"></div>

        <div className="flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <Badge className="bg-primary/10 text-primary border-none px-5 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
              Digital Guide
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
              Your <span className="text-secondary">Soul's</span> <br />
              Indian Odyssey
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Not sure where to start? Let <span className="text-secondary font-bold">IndiBot</span> craft your perfect itinerary based on your soul's desire for discovery.
            </p>
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none px-12 py-8 text-xl rounded-full shadow-2xl shadow-secondary/20">
              <Link to="/app/indibot">Consult IndiBot</Link>
            </Button>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="relative aspect-square flex items-center justify-center">
              {/* Background Glows */}
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse-glow"></div>
              <div className="absolute inset-20 bg-secondary/20 rounded-full blur-[80px] animate-pulse-glow [animation-delay:2s]"></div>

              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border-[1px] border-primary/20 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-10 rounded-full border-[1px] border-secondary/20 animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-20 rounded-full border-[1px] border-primary/10 animate-[spin_25s_linear_infinite]"></div>

              {/* Central Orb */}
              <div className="relative z-10 w-64 h-64 glass-card rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(249,115,22,0.2)] animate-orb-float border-white/20">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative flex items-center justify-center">
                  <div className="absolute -top-4 -right-4 animate-bounce [animation-duration:3s]">
                    <Sparkles className="h-10 w-10 text-primary fill-primary/20" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 animate-bounce [animation-duration:4s]">
                    <Sparkles className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="bg-secondary p-8 rounded-full shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                    <Bot className="h-24 w-24 text-white relative z-10" />
                  </div>
                </div>
              </div>

              {/* Data Floating Elements */}
              <div className="absolute top-10 left-10 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-float [animation-delay:1s]">
                <div className="w-8 h-1 bg-primary/40 rounded-full mb-2"></div>
                <div className="w-12 h-1 bg-secondary/40 rounded-full"></div>
              </div>
              <div className="absolute bottom-10 right-10 p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-float [animation-delay:2s]">
                <div className="w-12 h-1 bg-secondary/40 rounded-full mb-2"></div>
                <div className="w-8 h-1 bg-primary/40 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
