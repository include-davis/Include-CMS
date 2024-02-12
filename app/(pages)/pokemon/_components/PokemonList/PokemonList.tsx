import styles from './PokemonList.module.scss';
import type Pokemon from '@datatypes/Pokemon';
import { getPokemon } from '@datalib/pokemon/get';

import PokemonCard from '../PokemonCard/PokemonCard';
export default async function PokemonList() {
  const res = await getPokemon();
  const pokemon = await res.json();
  if (!pokemon.ok) return 'Failed to retrieve Pokemon';
  return (
    <div className={styles.list_container}>
      {pokemon.body.map((pokemon: Pokemon, index: number) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
