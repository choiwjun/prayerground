import { cookies } from "next/headers";
import { createServerClient, type SetAllCookies } from "@supabase/ssr";

import { env, hasPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/types/database";

export async function getSupabaseServerClient() {
  if (!hasPublicSupabaseEnv()) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      }
    }
  });
}
