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
    <table className="pokemon-grid">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {pokemon.map((pokemon, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{pokemon.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
      <style global jsx>{`
        .pokemon-grid {
          width: 100%;
          border-collapse: collapse;
        }

        .pokemon-grid th, .pokemon-grid td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }

        .pokemon-grid th {
          background-color: #f0f0f0;
        }
      `}</style>
      {loading ? <p>Loading...</p> : <PokemonList pokemon={pokemon} />}
    </>
  )
}

export default App
