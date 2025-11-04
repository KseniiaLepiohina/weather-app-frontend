import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function WeatherApp() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { lat, lng, cityname,countryCode } = state || {}; // координати з location.state

  const [data, setData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  
  useEffect(() => {
    if (lat && lng) {
      axios
        .get(`http://localhost:5000/weather-data/getWeatherDataByLocation?lat=${lat}&lng=${lng}`)
        .then((res) => setData(res.data))
        .catch((error) => alert('Failed to fetch data', error));
    }
  }, [lat, lng]);

  useEffect(() => {
    axios.get(`http://localhost:5000/weather-data/getWeatherForecastByLocation?lat=${lat}&lng=${lng}`)
      .then((res) => setForecastData(res.data))
      .catch((error) => alert('Forecast data not found', error))
  }, [lat, lng])

 useEffect(() => {
    if (cityname && countryCode) {
      axios
        .get(`http://localhost:5000/weather-data/getWeatherByCity?cityName=${cityname}&countryCode=${countryCode}`)
        .then((res) => setData(res.data))
        .catch(() => alert('City name was not found'));
    }
  }, [cityname, countryCode]);

  if (!lat || !lng || cityname ||countryCode) {
    // якщо координат нема — повертаємось на форму
    navigate('/');
    return null;
  }

  if (!data) {
    return <h2>Loading...</h2>;
  }
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',];

  return (
    <section className="main">
      <section className="intro">
        <section className="details">
          <h2>{days[new Date(data.dt).getDay()]}</h2>
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
          </span><section className="details">
            <strong>
              <h3>{data.weather[0].main}</h3></strong>
            <section className="describing-container">
              <strong><h2>{Math.round(data.main.temp)}°C</h2></strong>
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
              ?.filter((_, index) => index % 8 === 0) // 8 записів ≈ 1 день
              ?.slice(0, 4) // тільки 4 дні
              ?.map((forecast, index) => (
                <section
                  className="forecast_day"
                  key={index}>
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
        <Link to='/'>
          <button className="location_btn" onClick={() => navigate('/')}>
            <h2>Change Location</h2>
          </button>
        </Link>

      </section>
    </section>
  );
}
