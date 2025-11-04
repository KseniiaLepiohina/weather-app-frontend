
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetCoordinates() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const[cityname,setCityname] = useState('');
  const [countryCode,setCountryCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // передаємо координати у state при переході
    navigate('/weather', { state: { lat, lng } });
  };
  const handleCityWeatherSubmit = (e) => {
    e.preventDefault();
    navigate('/weather',{state:{cityname,countryCode}})
  }

  return (
    <section className='modal'>
      <form className='getAweather' onSubmit={handleSubmit}>
        <section className='coordinates'>
          <label htmlFor='lat'>Latitude</label>
          <input
            id='lat'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
          />
        </section>

        <section className='coordinates'>
          <label htmlFor='lng'>Longitude</label>
          <input
            id='lng'
            value={lng}
            onChange={(e) => setLng(e.target.value)}
          />
        </section>
        <span /><h2>OR</h2><span />
        <form onSubmit={handleCityWeatherSubmit}>
          <label htmlFor="city-input">City<br/>
          (enter the city+contry code)
          </label>
          <input
            id='city-input'
            name='city'
            onChange={(e) => {
      const [city, country] = e.target.value.split(',');
      setCityname(city?.trim() || '');
      setCountryCode(country?.trim() || '');
    }}
            required
            placeholder='London,GB'
          />
        </form>
        <button className='weather_btn' type='submit'>
          Get weather by location
        </button>
      </form>
    </section>
  );
}
