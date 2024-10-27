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
      setWeatherData((prevData) => [...prevData, { ...data, isEditing: false }]);
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

  const deleteBtn = (index) => {
    setWeatherData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const toggleEdit = (index) => {
    setWeatherData((prevData) =>
      prevData.map((data, i) =>
        i === index ? { ...data, isEditing: !data.isEditing } : data
      )
    );
  };

  const handleDescriptionChange = (index, newDescription) => {
    setWeatherData((prevData) =>
      prevData.map((data, i) =>
        i === index
          ? { ...data, current: { ...data.current, condition: { text: newDescription } } }
          : data
      )
    );
  };

  return (
    <>
      <div className=" h-[90vh] ">
        <h1>Weather App</h1>
        <div className="flex gap-24 mt-8 justify-center">
          <div className="">
            <button className="px-4 py-2 bg-red-400" onClick={getNextCityWeather}>
              Get Weather
            </button>
            <p className="border border-red-200 px-2 py-2">Mumbai</p>
            <p className="border border-red-200 px-2 py-2">Pune</p>
            <p className="border border-red-200 px-2 py-2">Delhi</p>
            <p className="border border-red-200 px-2 py-2">Bangalore</p>
          </div>
          <div className="">
            <div className=" flex gap-4">
              <input
                type="text"
                placeholder="Search city"
                onChange={handleChange}
                value={searchCity}
                className="border rounded-md w-[620px] border-red-400 text-xl p-2"
              />
              <button className="border text-xl px-4 py-2 border-red-400 " onClick={searchBtn}>
                Search
              </button>
            </div>
            <div className="flex justify-center items-center">
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
                        <th className="border border-gray-500 px-4 py-2">❌</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherData.map((data, index) => (
                        <tr key={index}>
                          <td className="border border-gray-500 px-4 py-2">{data.location.name}</td>
                          <td className="border border-gray-500 px-4 py-2">
                            {data.isEditing ? (
                              <input
                                type="text"
                                value={data.current.condition.text}
                                onChange={(e) =>
                                  handleDescriptionChange(index, e.target.value)
                                }
                                onBlur={() => toggleEdit(index)}
                                className="border p-1"
                              />
                            ) : (
                              <span onClick={() => toggleEdit(index)}>
                                {data.current.condition.text}
                              </span>
                            )}
                          </td>
                          <td className="border border-gray-500 px-4 py-2">{data.current.temp_c}°C</td>
                          <td className="border border-gray-500 px-4 py-2">{data.current.pressure_mb}</td>
                          <td className="border border-gray-500 px-4 py-2">{data.current.vis_miles}</td>
                          <td className="border border-gray-500 px-4 py-2 text-center">
                            <button onClick={() => deleteBtn(index)}>❌</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <p className=" text-red-500 text-center text-3xl">made by Karan Vasupalli</p>
      </div>
    </>
  );
};

export default Weather;
