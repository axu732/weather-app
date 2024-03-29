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

  const [isloading, setIsLoading] = React.useState(false);

  const [searchCity, setSearchCity] = React.useState("");

  const fetchWeatcher = async (latitude: number, longitude: number) => {
    const url = `${api_url}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      const url = `${api_url}weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      const searchResult: WeatherDisplayProps = response.data;

      return searchResult;
    } catch (error) {
      alert("City not found");
      throw error;
    }
  };

  const handleSearch = async () => {
    if (searchCity.trim() === "") return;

    try {
      const currentWeatherData = await fetchWeatherByCity(searchCity);
      setWeatherData(currentWeatherData);
      setSearchCity("");
    } catch (error) {
      console.log("No Results found");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColour: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColour = "grey";
        break;
      case "Clear":
        iconElement = <BsSunFill />;
        iconColour = "yellow";
        break;
      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColour = "white";
        break;
      case "Mist":
        iconElement = <BsCloudFog2Fill />;
        iconColour = "grey";
        break;
      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColour = "#7B2869";
    }

    return (
      <span className="weatherIcon" style={{ color: iconColour }}>
        {iconElement}
      </span>
    );
  };

  React.useEffect(() => {
    const successCallback = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      try {
        const currentWeather = await fetchWeatcher(latitude, longitude);
        setWeatherData(currentWeather);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const errorCallback = async (error: GeolocationPositionError) => {
      console.error("Error getting geolocation:", error);
      const aucklandLatitude = -36.8485;
      const aucklandLongitude = 174.7633;
      try {
        const aucklandWeather = await fetchWeatcher(
          aucklandLatitude,
          aucklandLongitude
        );
        setWeatherData(aucklandWeather);
        setIsLoading(true);
      } catch (error) {
        console.error("Error fetching Auckland weather data:", error);
      }
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return (
    <WeatherDisplayWrapper>
      <div className="background">
        <div className="container">
          <div className="searchArea">
            <input
              type="text"
              placeholder="Search for a city"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <div className="searchCircle">
              <IoSearchCircle className="searchIcon" onClick={handleSearch} />
            </div>
          </div>

          {weatherData && isloading ? (
            <>
              <div className="weatherArea">
                <h1>{weatherData.name}</h1>
                <span>{weatherData.sys.country}</span>
                <div className="weatherIcon">
                  {iconChanger(weatherData.weather[0].main)}
                </div>
                <h1>{weatherData.main.temp}°C</h1>
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
          ) : (
            <div className="loading">
              <RiLoaderFill className="loadingIcon" />
              <span className="loadingText">
                Loading<span className="dot">...</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </WeatherDisplayWrapper>
  );
};

export default WeatherDisplay;
