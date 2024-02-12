import styles from './PokemonList.module.scss';
import type Pokemon from '@datatypes/Pokemon';

import { GetPokemon } from '@actions/pokemon/GetPokemon';

import PokemonCard from '../PokemonCard/PokemonCard';
export default async function PokemonList() {
  const pokemon = await GetPokemon();
  if (!pokemon.ok) return 'Failed to retrieve Pokemon';
  return (
    <div className={styles.list_container}>
      {pokemon.body.map((pokemon: Pokemon, index: number) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
