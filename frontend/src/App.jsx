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

// inside <Route path="/app" ... >


// inside <Route path="/app" ... >



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
              <Route path="place/:id" element={<PlaceDetails />} />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<HomeApp />} />
          <Route path="explore" element={<ExploreApp />} />
          <Route path="indibot" element={<IndiBotApp />} />
          <Route path="saved" element={<SavedPlaces />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
