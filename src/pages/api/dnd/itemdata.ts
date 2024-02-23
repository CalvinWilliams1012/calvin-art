import { ssrSupabase } from '../../../lib/supabase.ts'
export const prerender = false;


export async function GET({ cookies }) {
  const supaClient = await ssrSupabase(cookies);
  const { data } = await supaClient.from('Items').select("*");
  return new Response(
    JSON.stringify({
      items: data,
    }),
  )
}

export async function POST({cookies, request}) {
  // Have RLS set up but need to do something like described here: https://github.com/orgs/supabase/discussions/1094
  // looks like it's expected to use supabase on client side not server side, so need to use this server side component example https://supabase.com/docs/guides/auth/server-side/creating-a-client?environment=server-component
  const supaClient = await ssrSupabase(cookies);
  
  const formData = await request.formData();
  const id = formData.get('id');
  const name = formData.get('name');
  const desc = formData.get('desc');
  const quantity = formData.get('quantity');
  console.log(name);
  console.log(formData);
  const {data, error} = await supaClient.from('Items').upsert({
    'id': id,
    'Name': name,
    'Description': desc,
    'Quantity': quantity
  }).select();
  console.log(error);
  return new Response(
    JSON.stringify({
      updatedItem: data,
    }),
  )
}