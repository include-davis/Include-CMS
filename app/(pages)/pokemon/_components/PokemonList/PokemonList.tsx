import styles from './PokemonList.module.scss';
import type Pokemon from '@datatypes/Pokemon';

import PokemonCard from '../PokemonCard/PokemonCard';
export default async function PokemonList() {
  const res = await fetch('http://localhost:3000/api/pokemon');
  const pokemon = await res.json();
  return (
    <div className={styles.list_container}>
      {pokemon.body.map((pokemon: Pokemon, index: number) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
}
