import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { MapPin, Heart, Bot, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={isAuthenticated ? "/app" : "/"} className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-orange-600" />
            <span className="text-2xl text-gray-900 font-bold">BharatView</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/app/explore">
                    Explore
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/app/indibot" className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    IndiBot
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/app/saved" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Saved
                  </Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled className="opacity-100 font-medium">
                      {user?.name}
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled className="opacity-80 text-xs">
                      {user?.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-700">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
