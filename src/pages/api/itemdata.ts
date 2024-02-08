import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase.ts'
export const prerender = false;

export async function GET({ params }) {
  const { data } = await supabase.from('Items').select("*");
  return new Response(
    JSON.stringify({
      items: data,
    }),
  )
}