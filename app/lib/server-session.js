
import 'server-only';

import { headers } from 'next/headers';
import { auth } from './auth';


export async function getServerUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user ?? null;
  } catch (error) {
    console.error('Error fetching server user:', error);
    return null;
  }
}
