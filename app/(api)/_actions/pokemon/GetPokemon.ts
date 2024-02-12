'use server';

export async function GetPokemon() {
  const res = await fetch(process.env.DEPLOY_URL + '/api/pokemon');
  const pokemon = await res.json();
  return pokemon;
}
