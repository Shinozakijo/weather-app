"use client";
import { useEffect, useState } from "react";
import type { WeatherData } from "@/types/weather";
import WeatherBox from "./components/weather-box/weather-box";
import SearchForm from "./components/search-form/search-form";

const DEFAULT_CITIES = ["Bangkok", "London", "Tokyo", "New York"];

export default function Home() {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [defaultWeathers, setDefaultWeathers] = useState<(WeatherData | null)[]>([null, null, null, null]);

  const apikey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    Promise.all(
      DEFAULT_CITIES.map(city =>
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric&lang=th`)
          .then(res => res.ok ? res.json() : null)
          .catch(() => null)
      )
    ).then(setDefaultWeathers)
  }, [apikey])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setWeather(null);
    if(!city) {
      setError("Please enter a city name.");
      return;
    }
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric&lang=th`);
      if(!res.ok){
        setError("Network response was not ok");
        return;
      }
      const data = await res.json();
      setWeather(data);
    } catch {
      setError("Failed to fetch weather data. Please try again.");
    }
  }

  return (
    <div className="container">
      { error && <div className="error-message">{error}</div>}
      <div className="weather-box-list">
        {defaultWeathers.map((w, idx) => 
          w ? (
            <WeatherBox key={w.name} weather={w} />
          ) : (
            <div key={idx} className="weather-box loading">
              Loading...
            </div>
          )
        )}
      </div>
      <SearchForm city={city} setCity={setCity} onSubmit={handleSubmit}/>
      { weather && (
        <div style={{ marginTop: 24 }}>
          <WeatherBox weather={weather} />
        </div>
      )}
    </div>
  )
}