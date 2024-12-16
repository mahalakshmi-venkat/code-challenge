import { List } from 'ui';
import React, { useState, useEffect } from 'react';
const api = "https://pokeapi.co/api/v2/pokemon?limit=151"

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
    <List />
  </>
  )
}

export default App
