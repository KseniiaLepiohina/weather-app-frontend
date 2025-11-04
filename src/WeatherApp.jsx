import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function WeatherApp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { lat, lng, cityname, countryCode } = state || {}; // дані з location.state

  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  // --- якщо є координати ---
  useEffect(() => {
    if (lat && lng) {
      axios
        .get(`http://localhost:5000/weather-data/getWeatherDataByLocation?lat=${lat}&lng=${lng}`)
        .then((res) => setData(res.data))
        .catch(() => alert('Failed to fetch data'));
    }
  }, [lat, lng]);

  // --- прогноз по координатах ---
  useEffect(() => {
    if (lat && lng) {
      axios
        .get(`http://localhost:5000/weather-data/getWeatherForecastByLocation?lat=${lat}&lng=${lng}`)
        .then((res) => setForecastData(res.data))
        .catch(() => alert('Forecast data not found'));
    }
  }, [lat, lng]);

  // --- якщо є city + code ---
  useEffect(() => {
    if (cityname && countryCode) {
      axios
        .get(`http://localhost:5000/weather-data/getWeatherByCity?cityName=${cityname}&countryCode=${countryCode}`)
        .then((res) => setData(res.data))
        .catch(() => alert('City name was not found'));
    }
  }, [cityname, countryCode]);
//--прогноз погоди по city+code--
useEffect(() => {
    if (cityname && countryCode) {
      axios
        .get(`http://localhost:5000/weather-data/forecastByCityName?cityName=${cityname}&countryCode=${countryCode}`)
        .then((res) => setForecastData(res.data))
        .catch(() => alert('forecast by city was not found'));
    }
  }, [cityname, countryCode]);

  // --- якщо взагалі нічого не передано ---
  useEffect(() => {
    if (!lat && !lng && !cityname && !countryCode) {
      navigate('/');
    }
  }, [lat, lng, cityname, countryCode, navigate]);

  if (!data) return <h2>Loading...</h2>;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <section className="main">
      <section className="intro">
        <section className="details">
          <h2>{days[new Date(data.dt * 1000).getDay()]}</h2>
          {new Date(data.dt * 1000).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
          <section className="details-container">
            <h3>{data.name}</h3>,
            <h3>{data.sys.country}</h3>
          </section>
        </section>

        <section className="details">
          <span>
            <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
            />
          </span>
          <section className="details">
            <strong>
              <h3>{data.weather[0].main}</h3>
            </strong>
            <section className="describing-container">
              <strong>
                <h2>{Math.round(data.main.temp)}°C</h2>
              </strong>
            </section>
          </section>
        </section>
      </section>

      <section className="describe-container">
        <section className="describing-container">
          <h2>HUMIDITY</h2>
          <h2>{data.main.humidity}%</h2>
        </section>
        <section className="describing-container">
          <h2>WIND</h2>
          <h2>{data.wind.speed} m/s</h2>
        </section>

        {forecastData && (
          <section className="forecast">
            {forecastData?.list
              ?.filter((_, index) => index % 8 === 0)
              ?.slice(0, 4)
              ?.map((forecast, index) => (
                <section className="forecast_day" key={index}>
                  <img
                    src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                    alt={forecast.weather[0].description}
                  />
                  <h2>{days[new Date(forecast.dt_txt).getDay()]}</h2>
                  <h2>{Math.round(forecast.main.temp)}°C</h2>
                </section>
              ))}
          </section>
        )}

        <Link to="/">
          <button className="location_btn" onClick={() => navigate('/')}>
            <h2>Change Location</h2>
          </button>
        </Link>
      </section>
    </section>
  );
}
