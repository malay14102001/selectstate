import React, { useState, useEffect } from 'react';
import './App.css';

function CitySelector() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch countries data
    fetch('https://crio-location-selector.onrender.com/countries')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => setErrorMessage('Failed to fetch countries'));
  }, []);

  useEffect(() => {
    // Fetch states data based on selected country
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => setErrorMessage('Failed to fetch states'));
    }
  }, [selectedCountry]);

  useEffect(() => {
    // Fetch cities data based on selected country and state
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then(response => response.json())
        .then(data => setCities(data))
        .catch(error => setErrorMessage('Failed to fetch cities'));
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState('');
    setSelectedCity('');
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div className="container">
      <h1>Location Selector</h1>
      <div className="dropdown">
        <label htmlFor="country">Select Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select Country --</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="state">Select State:</label>
        <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option value="">-- Select State --</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
      <div className="dropdown">
        <label htmlFor="city">Select City:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">-- Select City --</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
    </div>
  );
}

export default CitySelector;
