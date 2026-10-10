
'use client';

import { authClient } from "./auth-client";



export async function getClientUser() {
  try {
    const { data: session } = await authClient.getSession();

    return session?.user ?? null;
  } catch (error) {
    console.error('Error fetching client user:', error);
    return null;
  }
}
