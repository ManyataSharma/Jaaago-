import React, { createContext, useContext, useState, useEffect } from 'react';

interface LocationContextType {
  city: string;
  state: string;
  coordinates: { lat: number; lng: number } | null;
  updateLocation: (city: string, state: string, coords?: { lat: number; lng: number }) => void;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const updateLocation = (newCity: string, newState: string, coords?: { lat: number; lng: number }) => {
    setCity(newCity);
    setState(newState);
    if (coords) {
      setCoordinates(coords);
    }
  };

  const requestLocation = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser. Using default location: Jaipur');
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              const detectedCity = result.components.city || result.components.town || result.components.village || 'Unknown';
              const detectedState = result.components.state || 'Unknown';
              setCity(detectedCity);
              setState(detectedState);
            }
          } catch (error) {
            console.error('Error getting location name:', error);
          }
          
          resolve();
        },
        (error) => {
          alert('Location access denied. Using default location: Jaipur');
          reject(error);
        }
      );
    });
  };

  useEffect(() => {
    // Try to get location on app load
    requestLocation().catch(() => {
      // Fallback to default location already set
    });
  }, []);

  return (
    <LocationContext.Provider value={{ city, state, coordinates, updateLocation, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
};