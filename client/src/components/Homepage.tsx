/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

function Homepage() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const response = await fetch(`https://weather-app-e5kg.onrender.com/api/weather?city=${city}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Error fetching weather data");
      }
      setWeatherData(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
  style={{ backgroundImage: "url('assets/noaa-0ETSZYPjvDo-unsplash.jpg')" }}
>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="p-3 rounded-full bg-white/90 text-gray-800 placeholder:text-gray-500 w-64 shadow-md focus:outline-none"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
        >
          Get Weather
        </button>
      </div>

      {error && <div className="text-red-200 mb-4">{error}</div>}

      {weatherData && (
        <div className="w-80 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl text-white p-6 shadow-2xl flex flex-col items-center gap-4">
          <div className="text-xl font-semibold">{weatherData.name}, {weatherData.sys.country}</div>
          <div className="text-5xl font-bold">
            {Math.round(weatherData.main.temp)}°C
          </div>
          <div className="flex items-center gap-2 text-lg">
            <span className="capitalize">{weatherData.weather[0].description}</span>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="icon"
              className="w-10 h-10"
            />
          </div>
          <div className="flex justify-between w-full text-sm mt-4">
            <div className="text-center w-1/2">
              <p className="font-semibold">Humidity</p>
              <p>{weatherData.main.humidity}%</p>
            </div>
            <div className="text-center w-1/2">
              <p className="font-semibold">Wind Speed</p>
              <p>{weatherData.wind.speed} km/h</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
