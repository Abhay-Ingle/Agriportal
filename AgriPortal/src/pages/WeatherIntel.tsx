import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CloudSun, Thermometer, Droplets, Wind, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_KEY = "42a85740fd2d265de88f667fcb39632a";

export default function WeatherIntel() {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [useManualCity, setUseManualCity] = useState(false);

  useEffect(() => {
    // Try to get user's location on mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.log("Geolocation error:", error);
          setLocationError("Using default location. Click to select a city.");
          setUseManualCity(true);
          fetchWeather("Pune");
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setUseManualCity(true);
      fetchWeather("Pune");
    }
  }, []);

  const fetchWeatherByCoords = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
      setCity(data.name || city);
      setLoading(false);
    } catch (error) {
      console.error("Weather fetch error:", error);
      fetchWeather("Pune");
      setLoading(false);
    }
  };

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setWeather(data);
      setCity(cityName);
      setLoading(false);
    } catch (error) {
      console.error("Weather fetch error:", error);
      setLoading(false);
    }
  };

  const handleRefreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
          setLocationError("");
          setUseManualCity(false);
        },
        (error) => {
          setLocationError("Unable to get location. Showing default city.");
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-4">
      <div className="container mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto rounded-xl gradient-primary flex items-center justify-center mb-6">
            <CloudSun className="w-8 h-8 text-primary-foreground" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Weather Intel</h1>
          <p className="text-muted-foreground">
            Real-time weather insights for smarter farming decisions.
          </p>
        </motion.div>

        {/* Location Info */}
        <div className="bg-card border rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold text-lg">{city}</span>
            {!useManualCity && <span className="text-xs text-muted-foreground ml-2">(Location-based)</span>}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefreshLocation}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Location
          </Button>
        </div>

        {/* Error Message */}
        {locationError && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 mb-6 text-sm text-yellow-800">
            {locationError}
          </div>
        )}

        {/* City Selector (Manual) */}
        {useManualCity && (
          <div className="flex justify-center mb-10">
            <Select onValueChange={(value) => {
              setCity(value);
              fetchWeather(value);
            }}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pune">Pune</SelectItem>
                <SelectItem value="Nashik">Nashik</SelectItem>
                <SelectItem value="Nagpur">Nagpur</SelectItem>
                <SelectItem value="Solapur">Solapur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Weather Data */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading weather...</div>
        ) : weather && weather.main ? (
          <div className="grid md:grid-cols-3 gap-8">

            {/* Temperature */}
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <Thermometer className="w-6 h-6 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Temperature</h3>
              <p className="text-2xl font-bold">
                {weather.main.temp}°C
              </p>
            </div>

            {/* Humidity */}
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <Droplets className="w-6 h-6 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Humidity</h3>
              <p className="text-2xl font-bold">
                {weather.main.humidity}%
              </p>
            </div>

            {/* Wind */}
            <div className="bg-card border rounded-xl p-6 text-center shadow-sm">
              <Wind className="w-6 h-6 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Wind Speed</h3>
              <p className="text-2xl font-bold">
                {weather.wind.speed} km/h
              </p>
            </div>

          </div>
        ) : (
          <div className="text-center text-destructive">
            Failed to load weather data.
          </div>
        )}

      </div>
    </div>
  );
}
