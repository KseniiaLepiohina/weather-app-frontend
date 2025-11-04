import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GetCoordinates() {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [cityname, setCityname] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // якщо заповнені координати
    if (lat && lng) {
      navigate('/weather', { state: { lat, lng } });
      return;
    }

    // якщо заповнено city + country
    if (cityname && countryCode) {
      navigate('/weather', { state: { cityname, countryCode } });
      return;
    }

    // якщо нічого не заповнено
    alert('Please enter coordinates or a city name (e.g. London,GB)');
  };

  return (
    <section className='modal'>
      <form className='getAweather' onSubmit={handleSubmit}>
        <h2>Find Weather</h2>

        {/* --- Варіант 1: координати --- */}
        <section className='coordinates'>
          <label htmlFor='lat'>Latitude</label>
          <input
            id='lat'
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder='e.g. 50.45'
          />
        </section>

        <section className='coordinates'>
          <label htmlFor='lng'>Longitude</label>
          <input
            id='lng'
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder='e.g. 30.52'
          />
        </section>

        <span className='divider'><h3>OR</h3></span>

        {/* --- Варіант 2: city + code --- */}
        <label htmlFor="city-input">
          City (enter as <b>City,CountryCode</b>)
        </label>
        <input
          id='city-input'
          name='city'
          onChange={(e) => {
            const [city, country] = e.target.value.split(',');
            setCityname(city?.trim() || '');
            setCountryCode(country?.trim() || '');
          }}
          placeholder='e.g. London,GB'
        />

        <button className='weather_btn' type='submit'>
          Get Weather
        </button>
      </form>
    </section>
  );
}
