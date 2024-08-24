import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(process.env.SUPABASE_URL, process.env.ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
