import { createBrowserClient } from "@supabase/ssr";

import { env, hasPublicSupabaseEnv } from "@/lib/env";
import type { Database } from "@/lib/types/database";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function getSupabaseBrowserClient() {
  if (!hasPublicSupabaseEnv()) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
  }

  return browserClient;
}
