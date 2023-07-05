import React, { useState } from "react";

interface Country {
  name: string;
  cities: string[];
}

const Countries2 = () => {
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

  // selected state
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // handleselect
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value;
    const selectedCountry = countries.find((c) => c.name === countryName);
    setSelectedCountry(selectedCountry || null);
    console.log({ selectedCountry });
  };

  return (
    <div>
      <h1>Country Selector</h1>
      <select onChange={handleSelect}>
        <option value="">select a country</option>
        {countries
          .sort((a, b) => (a.name < b.name ? -1 : 1))
          .map((c, idx) => {
            return (
              <option key={idx} value={c.name}>
                {c.name}
              </option>
            );
          })}
      </select>

      <select name="" id="">
        <option value="">select a city</option>
        {selectedCountry?.cities
          .sort((a, b) => (a < b ? -1 : 1))
          .map((c) => {
            return <option value={c}>{c}</option>;
          })}
      </select>
    </div>
  );
};

export default Countries2;
