import React, { useState, ChangeEvent } from "react";
import countries from "../data/countries.json";

interface Country {
  name: string;
  cities: string[];
}

const Countries3 = () => {
  const [country, setCountry] = useState<Country | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    const selectedCountry = countries.countries.find(
      (c) => c.name === countryName
    );
    setCountry(selectedCountry || null);
    console.log({ country: selectedCountry });
  };

  return (
    <div>
      <h1>Country Selection</h1>
      <select onChange={handleChange}>
        <option value="">choose a country</option>
        {countries.countries
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((country) => {
            return (
              <option value={country.name} key={country.name}>
                {country.name}
              </option>
            );
          })}
      </select>

      <select name="" id="">
        <option value="">select a city</option>
        {country &&
          country.cities
            .sort((a, b) => (a < b ? -1 : 1))
            .map((c) => {
              return (
                <option value={c} key={c}>
                  {c}
                </option>
              );
            })}
      </select>
    </div>
  );
};

export default Countries3;
