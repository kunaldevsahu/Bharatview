import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AppLayout from "./pages/AppLayout";
import HomeApp from "./pages/HomeApp";
import ExploreApp from "./pages/ExploreApp";
import IndiBotApp from "./pages/IndiBotApp";
import PlaceDetails from "./pages/PlaceDetails";
import SavedPlaces from "./pages/SavedPlaces";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected App */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* DEFAULT PAGE */}
          <Route index element={<HomeApp />} />

          {/* APP PAGES */}
          <Route path="explore" element={<ExploreApp />} />
          <Route path="indibot" element={<IndiBotApp />} />
          <Route path="saved" element={<SavedPlaces />} />
          <Route path="place/:id" element={<PlaceDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
