import React, { createContext, useContext, useState, useEffect } from 'react';

const SavedPlacesContext = createContext(undefined);

export function SavedPlacesProvider({ children }) {
  const [savedPlaces, setSavedPlaces] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('bharatview_saved_places');
    if (stored) {
      setSavedPlaces(JSON.parse(stored));
    }
  }, []);

  const toggleSavedPlace = (placeId) => {
    setSavedPlaces(prev => {
      const newSaved = prev.includes(placeId)
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId];

      localStorage.setItem('bharatview_saved_places', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isSaved = (placeId) => savedPlaces.includes(placeId);

  return (
    <SavedPlacesContext.Provider value={{ savedPlaces, toggleSavedPlace, isSaved }}>
      {children}
    </SavedPlacesContext.Provider>
  );
}

export function useSavedPlaces() {
  const context = useContext(SavedPlacesContext);
  if (context === undefined) {
    throw new Error('useSavedPlaces must be used within a SavedPlacesProvider');
  }
  return context;
}
