import type { APIRoute } from "astro";
import { ssrSupabase } from "../../../lib/supabase";
export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  const supaClient = await ssrSupabase(cookies);
  const {error} = await supaClient.auth.signOut();
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect("/auth/signin");
};