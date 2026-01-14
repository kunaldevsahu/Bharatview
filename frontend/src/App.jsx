import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { SavedPlacesProvider } from "./contexts/SavedPlacesContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomeApp from "./pages/HomeApp";
import ExploreApp from "./pages/ExploreApp";
import IndiBotApp from "./pages/IndiBotApp";
import PlaceDetails from "./pages/PlaceDetails";
import SavedPlaces from "./pages/SavedPlaces";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/app" replace /> : <Landing />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/app" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/app" replace /> : <Register />}
        />

        {/* Protected App Routes */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 py-8">
                <HomeApp />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/explore"
          element={
            <ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 py-8">
                <ExploreApp />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/indibot"
          element={
            <ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 py-8">
                <IndiBotApp />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/saved"
          element={
            <ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 py-8">
                <SavedPlaces />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/app/place/:id"
          element={
            <ProtectedRoute>
              <div className="max-w-7xl mx-auto px-4 py-8">
                <PlaceDetails />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

const App = () => {
  return (
    <BrowserRouter>
      <SavedPlacesProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </SavedPlacesProvider>
    </BrowserRouter>
  );
};

export default App;
