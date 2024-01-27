import React from "react";
import { WeatherDisplayWrapper } from "./weather.module";
import { IoSearchCircle } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { SiWindicss } from "react-icons/si";

const WeatherDisplay = () => {
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

          <div className="weatherArea">
            <h1>New York City</h1>
            <span>USA</span>
            <div className="weatherIcon">Tingus</div>
            <h1>18c</h1>
            <h2>Cloudy</h2>
          </div>

          <div className="bottomInfo">
            <div className="humidityLevel">
              <WiHumidity className="humidityIcon" />
              <div className="humidInfo">
                <h1>60%</h1>
                <p>Humidity</p>
              </div>
            </div>

            <div className="windSpeed">
              <SiWindicss className="windIcon" />
              <div className="windInfo">
                <h1>5km/h</h1>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WeatherDisplayWrapper>
  );
};

export default WeatherDisplay;
