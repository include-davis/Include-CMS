'use server';

import { revalidatePath } from 'next/cache';
import FormToJSON from '@utils/form/FormToJSON';

export async function UpdatePokemon(id: string, formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await fetch(process.env.DEPLOY_URL + `/api/pokemon/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      $set: dataJSON,
    }),
    cache: 'no-store',
  });
  revalidatePath('/pokemon');
}
