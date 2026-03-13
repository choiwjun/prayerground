function readEnv(name: string) {
  return process.env[name]?.trim() || "";
}

export const env = {
  supabaseUrl: readEnv("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseAnonKey: readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  serviceRoleKey: readEnv("SUPABASE_SERVICE_ROLE_KEY"),
  kakaoJavascriptKey: readEnv("NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY"),
  kakaoRestApiKey: readEnv("KAKAO_REST_API_KEY")
};

export function hasPublicSupabaseEnv() {
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}
