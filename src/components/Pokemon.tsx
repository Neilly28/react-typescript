import React, { useEffect, useState } from "react";

interface PokemonData {
  name: string;
  url: string;
  image: string;
  id: number;
  types: string[];
}

interface FlavorTextEntry {
  language: {
    name: string;
  };
  flavor_text: string;
}

const Pokemon: React.FC = () => {
  // pokemon state
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);

  // selected state
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  // flavor text state
  const [text, setText] = useState<FlavorTextEntry | null>(null);

  // fetch data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        console.log({ data });

        const pokemonData: PokemonData[] = await Promise.all(
          data.results.map(async (poke: { name: string; url: string }) => {
            const response = await fetch(poke.url);
            const data = await response.json();
            return {
              ...poke,
              image: data.sprites.front_default,
              id: data.id,
              types: data.types.map(
                (type: { type: { name: string } }) => type.type.name
              ),
            };
          })
        );
        setPokemon(pokemonData);
        console.log({ pokemonData });
      } catch (err) {
        console.log(err);
      }
    };
    fetchPokemon();
  }, []);

  // fetch flavor text
  const fetchText = async (name: string) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`
      );
      const data = await response.json();
      const englishText: FlavorTextEntry | undefined =
        data.flavor_text_entries.find(
          (text: FlavorTextEntry) => text.language.name === "en"
        );
      setText(englishText || null);
      console.log({ englishText });
    } catch (err) {
      console.log(err);
    }
  };

  // handle select
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPokemonName = e.target.value;
    const selectedPokemon = pokemon.find(
      (poke: PokemonData) => poke.name === selectedPokemonName
    );
    console.log({ selectedPokemon });
    setSelectedPokemon(selectedPokemon || null);
    fetchText(selectedPokemonName);
  };

  return (
    <div className="container">
      <select onChange={handleSelect}>
        <option value="">Choose your pokemon</option>
        {pokemon.map((poke) => {
          return (
            <option value={poke.name} key={poke.name}>
              {poke.name}
            </option>
          );
        })}
      </select>
      <div>
        {selectedPokemon && (
          <div
            key={selectedPokemon.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>{selectedPokemon.id}</p>
            <img src={selectedPokemon.image} alt="" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "10px",
              }}
            >
              {selectedPokemon.types.map((type) => {
                return <p key={type}>{type}</p>;
              })}
            </div>
            <h2>{selectedPokemon.name}</h2>
            <p>{text?.flavor_text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
