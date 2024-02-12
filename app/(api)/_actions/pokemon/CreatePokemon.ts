'use server';

import { revalidatePath } from 'next/cache';
import FormToJSON from '@utils/form/FormToJSON';

export async function CreatePokemon(formData: FormData) {
  const dataJSON = FormToJSON(formData);
  await fetch('http://localhost:3000/api/pokemon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataJSON),
  });
  revalidatePath('/pokemon');
}
