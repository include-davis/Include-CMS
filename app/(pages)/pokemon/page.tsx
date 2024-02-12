import styles from './page.module.scss';

import CreatePokemonForm from './_components/CreatePokemonForm/CreatePokemonForm';
import PokemonList from './_components/PokemonList/PokemonList';

export default function Pokemon() {
  return (
    <div className={styles.body}>
      <h1>Test out some of our APIs</h1>
      <CreatePokemonForm />
      <PokemonList />
    </div>
  );
}
