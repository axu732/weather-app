import React from "react";
import { WeatherDisplayWrapper } from "./weather.module";
import { IoSearchCircle } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";
import {
  BsSunFill,
  BsCloudyFill,
  BsFillCloudRainFill,
  BsCloudFog2Fill,
} from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";

interface WeatherDisplayProps {
  name: String;
  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherDisplay = () => {
  const apiKey = "";
  const api_url = `https://api.openweathermap.org/data/2.5/`;

  const [weatherData, setWeatherData] =
    React.useState<WeatherDisplayProps | null>();

  const fetchWeatcher = async (latitude: number, longitude: number) => {
    const url = `${api_url}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchWeatcher(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
        }
      );
    });
  });

  return (
    <WeatherDisplayWrapper>
      <div className="background">
        <div className="container">
          <div className="searchArea">
            <input type="text" placeholder="Search for a city" />
            <div className="searchCircle">
              <IoSearchCircle className="searchIcon" />
            </div>
          </div>

          {weatherData && (
            <>
              <div className="weatherArea">
                <h1>{weatherData.name}</h1>
                <span>{weatherData.sys.country}</span>
                <div className="weatherIcon">Tingus</div>
                <h1>{weatherData.main.temp}</h1>
                <h2>{weatherData.weather[0].main}</h2>
              </div>

              <div className="bottomInfo">
                <div className="humidityLevel">
                  <WiHumidity className="humidityIcon" />
                  <div className="humidInfo">
                    <h1>{weatherData.main.humidity}%</h1>
                    <p>Humidity</p>
                  </div>
                </div>

                <div className="windSpeed">
                  <SiWindicss className="windIcon" />
                  <div className="windInfo">
                    <h1>{weatherData.wind.speed}km/h</h1>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </WeatherDisplayWrapper>
  );
};

export default WeatherDisplay;
