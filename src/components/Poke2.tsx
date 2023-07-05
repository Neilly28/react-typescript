import { useState, useEffect } from "react";

interface PokemonData {
  url: string;
  id: number;
  name: string;
  image: string;
}

const Poke2 = () => {
  // pokemon state
  const [pokemon, setPokemon] = useState<PokemonData[]>([]);

  //   search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  //   selected name
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(
    null
  );

  //   fetchdata
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        console.log({ data });

        const pokemonDetails = await Promise.all(
          data.results.map(async (poke: PokemonData) => {
            const response = await fetch(poke.url);
            const data = await response.json();
            return { ...poke, image: data.sprites.front_default, id: data.id };
          })
        );
        setPokemon(pokemonDetails);
        console.log({ pokemonDetails });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, []);

  //   filter
  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //   handleselect
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pokemonName = e.target.value;
    const selectedPokemon = pokemon.find((poke) => poke.name === pokemonName);
    setSelectedPokemon(selectedPokemon || null);
  };

  //   handlenext
  const handleNext = () => {
    if (selectedPokemon) {
      // get current index
      const currentIndex = pokemon.findIndex(
        (poke) => poke.id === selectedPokemon.id
      );

      //   get next index
      const nextIndex = currentIndex + 1;

      //   set selected pokemon index
      setSelectedPokemon(pokemon[nextIndex]);
    }
  };

  //   handle prev
  const handlePrev = () => {
    if (selectedPokemon) {
      // get current index
      const currentIndex = pokemon.findIndex(
        (poke) => poke.id === selectedPokemon.id
      );

      //   get pre index
      const prevIndex = currentIndex - 1;

      //   set selected pokemon index
      setSelectedPokemon(pokemon[prevIndex]);
    }
  };

  return (
    <div>
      <h1>my pokedex</h1>
      {/* <input
        type="text"
        placeholder="find your favorite"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h1>{searchTerm}</h1>
      {filteredPokemon.map((poke) => {
        const { id, image, name } = poke;
        return (
          <div key={id}>
            <p>#{id}</p>
            <img src={image} alt="" />
            <h2>{name}</h2>
          </div>
        );
      })} */}
      <select onChange={handleSelect}>
        <option value="">choose a pokemon</option>
        {pokemon.map((poke) => {
          return <option value={poke.name}>{poke.name}</option>;
        })}
      </select>
      {selectedPokemon && (
        <div>
          <p>#{selectedPokemon.id}</p>
          <img src={selectedPokemon.image} alt="" />
          <h1>{selectedPokemon.name}</h1>
          <button
            disabled={selectedPokemon.id === 1 ? true : false}
            onClick={handlePrev}
          >
            prev
          </button>
          <button
            disabled={selectedPokemon.id === pokemon.length ? true : false}
            onClick={handleNext}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
};

export default Poke2;
