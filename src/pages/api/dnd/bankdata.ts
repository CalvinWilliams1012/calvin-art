import { supabase } from '../../../lib/supabase.ts'
export const prerender = false;

export async function GET({ params }) {
  const { data } = await supabase.from('Bank').select("*");
  return new Response(
    JSON.stringify({
      coins: data,
    }),
  )
}