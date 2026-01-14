import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MapPin, Compass, Bot, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706765600789-8b5fdc8ece1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRvdXJpc20lMjBkaXZlcnNlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2ODIyNzI2NXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="India Tourism"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl mb-6 text-white font-bold">
            Discover India, One Place at a Time
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Your AI-powered journey through India's rich heritage, stunning nature, and spiritual wonders
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link to="/register">Start Exploring</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white text-gray-900 hover:bg-gray-100">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl text-center mb-12 text-gray-900 font-bold">
          Why Choose BharatView?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Compass className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900 font-semibold">Explore Destinations</h3>
            <p className="text-gray-600">
              Discover India's diverse tourism spots across Heritage, Nature, Spiritual, and Adventure categories
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900 font-semibold">IndiBot Assistant</h3>
            <p className="text-gray-600">
              Ask natural language questions and get personalized destination recommendations instantly
            </p>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900 font-semibold">Rich Information</h3>
            <p className="text-gray-600">
              Get detailed descriptions, historical context, budget guides, and interactive maps for each destination
            </p>
          </div>

          <div className="text-center">
            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl mb-2 text-gray-900 font-semibold">Save & Plan</h3>
            <p className="text-gray-600">
              Save your favorite places and build your personalized travel itinerary
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl mb-4 font-bold">
            Ready to Explore Incredible India?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of travelers discovering India's hidden gems
          </p>
          <Button asChild size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>
      </div>

      <footer className="py-12 border-t border-gray-100 bg-gray-50 text-gray-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-gray-900 tracking-tighter flex items-center gap-2">
            <MapPin className="h-6 w-6 text-orange-600" />
            BharatView
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-600 transition-colors">Contact Us</a>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} BharatView. Built for the Incredible India.</p>
        </div>
      </footer>
    </div>
  );
}
