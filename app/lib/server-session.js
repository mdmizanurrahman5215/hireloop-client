
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

export const requiredRole = async (role) => {
  const user = await getServerUser();
  if (!user) {
    return redirect("/signin");
  }
  if (user.role !== role) {
    return redirect("/unauthorized");
  }
};

export async function getServerSession() {
  try {
    return await auth.api.getSession({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Error fetching server session:", error);
    return null;
  }
}