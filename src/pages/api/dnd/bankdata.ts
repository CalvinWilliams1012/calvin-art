import { ssrSupabase } from '../../../lib/supabase.ts'
export const prerender = false;

export async function GET({ cookies }) {
  const supaClient = await ssrSupabase(cookies);
  const { data } = await supaClient.from('Bank').select("*");
  return new Response(
    JSON.stringify({
      coins: data,
    }),
  )
}