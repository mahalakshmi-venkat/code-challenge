import { createSlice } from '@reduxjs/toolkit';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: true,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemons(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPokemonsSuccess(state, action) {
      state.pokemons = action.payload;
      state.loading = false;
    },
    fetchPokemonsError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchPokemons, fetchPokemonsSuccess, fetchPokemonsError } = pokemonSlice.actions;
export default pokemonSlice.reducer;
