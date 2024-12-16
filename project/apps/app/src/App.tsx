import { List } from 'ui';
import React, { useState, useEffect } from 'react';
const api = "https://pokeapi.co/api/v2/pokemon?limit=151"

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemon: Pokemon[];
}

const PokemonList = ({ pokemon }: PokemonListProps) => {
  if (!pokemon.length) {
    return <p>No pokemons found.</p>;
  }

  return (
    <ul>
      {pokemon.map((pokemon, index) => (
        <li key={index}>
          <h2>{pokemon.name}</h2>
          <p>ID: {index + 1}</p>
        </li>
      ))}
    </ul>
  );
};




const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('data..',data)
        setPokemon(data.results.map((pokemon: any) => ({ name: pokemon.name, url: pokemon.url })));
        setLoading(false);
      } catch (error) {
        //setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
 <>
      <h1>Pokemon list:</h1>
      {loading ? <p>Loading...</p> : <PokemonList pokemon={pokemon} />}
    </>
  )
}

export default App
