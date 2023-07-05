import { useState, useEffect } from "react";

interface PokemonData {
  image: string;
  id: number;
  name: string;
}

const Poke = () => {
  // pokemon state
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);

  //   selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  //   search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  //   fetch data
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        console.log(data.results);
        setPokemon(data.results);

        const pokemonData = await Promise.all(
          data.results.map(async (poke: { url: string }) => {
            const response = await fetch(poke.url);
            const data = await response.json();
            return { ...poke, image: data.sprites.front_default, id: data.id };
          })
        );

        setPokemon(pokemonData);
        console.log({ pokemonData });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, []);

  //   handleselect
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pokemonName = e.target.value;
    const selectedPokemon = pokemon.find((poke) => poke.name === pokemonName);
    setSelectedPokemon(selectedPokemon || null);
  };

  //   handleSearch
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  //   filter
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>pokedex</h1>
      <input
        type="text"
        placeholder="find your favorite..."
        onChange={handleSearch}
      />
      <h2>{searchTerm}</h2>
      {/* <select onChange={handleSelect}>
        <option value="">choose your pokemon</option>
        {pokemon.map((poke) => {
          return <option value={poke.name}>{poke.name}</option>;
        })}
      </select>
      {selectedPokemon && (
        <div>
          <img src={selectedPokemon.image} alt="" />
          <h2>{selectedPokemon.name}</h2>
        </div>
      )} */}
      {filteredPokemon.map((poke) => {
        return (
          <div>
            <img src={poke.image} alt="" />
            <p>{poke.id}</p>
            <h2>{poke.name}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Poke;
