import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { fetchPokemons, fetchPokemonsSuccess, fetchPokemonsError } from './pokemonSlice';

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
  const dispatch = store.dispatch;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch(fetchPokemonsSuccess(data.results.map((pokemon: any) => ({ name: pokemon.name, url: pokemon.url }))));
      } catch (error) {
        dispatch(fetchPokemonsError(error.message));
      }
    };
    fetchData();
  }, [dispatch]);

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
      {store.getState().pokemon.loading ? <p>Loading...</p> : <PokemonList pokemon={store.getState().pokemon.pokemons} />}
      {store.getState().pokemon.error && <p>Error: {store.getState().pokemon.error}</p>}
    </>
  );
};

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;
