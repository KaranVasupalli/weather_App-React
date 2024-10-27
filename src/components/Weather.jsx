import React, { useState } from "react";

const api = {
  key: "ef8374474b4c4b76bb0105638242710",
  base: "http://api.weatherapi.com/v1/",
};

const Weather = () => {
  const [searchCity, setSearchCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  const cities = ["Mumbai", "Pune", "Delhi", "Bangalore"];

  const apifetch = async (city) => {
    try {
      const response = await fetch(
        `${api.base}current.json?key=${api.key}&q=${city}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData((prevData) => [...prevData, data]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleChange = (e) => {
    setSearchCity(e.target.value);
  };

  const searchBtn = () => {
    if (searchCity.trim() !== "") {
      apifetch(searchCity);
    }
  };

  const getNextCityWeather = () => {
    if (currentCityIndex < cities.length) {
      const city = cities[currentCityIndex];
      apifetch(city);
      setCurrentCityIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <div className="flex justify-around">
        <div className="border">
          <button className="px-4 py-2 bg-red-400" onClick={getNextCityWeather}>
            Get Weather
          </button>
          <p>Mumbai</p>
          <p>Pune</p>
          <p>Delhi</p>
          <p>Bangalore</p>
        </div>
        <div className="border">
          <div className=" flex gap-3">
            <input
              type="text"
              placeholder="Search city"
              onChange={handleChange}
              value={searchCity}
              className=" border rounded-md"
            />
            <button className=" border " onClick={searchBtn}>Search</button>
          </div>
          {weatherData.length > 0 && (
            <div>
              <table className="table-auto border-collapse border border-gray-500 mt-8">
                <thead>
                  <tr>
                    <th className="border border-gray-500 px-4 py-2">City</th>
                    <th className="border border-gray-500 px-4 py-2">Description</th>
                    <th className="border border-gray-500 px-4 py-2">Temperature (°C)</th>
                    <th className="border border-gray-500 px-4 py-2">Pressure (mb)</th>
                    <th className="border border-gray-500 px-4 py-2">Visibility (miles)</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.map((data, index) => (
                    <tr key={index}>
                      <td className="border border-gray-500 px-4 py-2">{data.location.name}</td>
                      <td className="border border-gray-500 px-4 py-2">{data.current.condition.text}</td>
                      <td className="border border-gray-500 px-4 py-2">{data.current.temp_c}°C</td>
                      <td className="border border-gray-500 px-4 py-2">{data.current.pressure_mb}</td>
                      <td className="border border-gray-500 px-4 py-2">{data.current.vis_miles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
