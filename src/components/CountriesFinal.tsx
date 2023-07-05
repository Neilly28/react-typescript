import React from "react";
import { useState } from "react";

interface Country {
  name: string;
  cities: string[];
}

const CountriesFinal = () => {
  // countries state
  const [countries, setCountries] = useState<Country[]>([
    {
      name: "United States",
      cities: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
    },
    {
      name: "Canada",
      cities: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    },
    {
      name: "United Kingdom",
      cities: ["London", "Manchester", "Birmingham", "Glasgow", "Edinburgh"],
    },
    {
      name: "Australia",
      cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    },
  ]);

  //   selected state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  //   handleselect
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    const selectedCountry = countries.find((country) => country.name === name);
    setSelectedCountry(selectedCountry || null);
  };

  return (
    <div>
      <select onChange={handleSelect}>
        <option value="">select a country</option>
        {countries.map((country, idx) => {
          return (
            <option value={country.name} key={idx}>
              {country.name}
            </option>
          );
        })}
      </select>
      <select name="" id="">
        <option value="">select a city</option>
        {selectedCountry?.cities.map((city) => {
          return <option value="">{city}</option>;
        })}
      </select>
      {selectedCountry && selectedCountry.name}
    </div>
  );
};

export default CountriesFinal;
