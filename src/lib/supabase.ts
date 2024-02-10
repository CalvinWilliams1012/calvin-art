import { createClient } from "@supabase/supabase-js";

export const prerender = false;

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: "pkce",
    },
  },
);

const supabaseServiceRole = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_SERVICE_ROLE
);


export async function getUser(cookies){
  
  const accessToken = cookies.get("sb-access-token");
  const refreshToken = cookies.get("sb-refresh-token");

  //If we dont have the session cookies, return null
  if (!accessToken || !refreshToken) {
    return null;
  }

  //Hit supabase, throws error if invalid session, or refreshes on expired
  const { data, error } = await supabase.auth.setSession({
    refresh_token: refreshToken.value,
    access_token: accessToken.value,
  });

  //invalid session, delete invalid cookies and return null
  if (error) {
    cookies.delete("sb-access-token", {
      path: "/",
    });
    cookies.delete("sb-refresh-token", {
      path: "/",
    });

    return null;
  }
  // return the session user.
  return data?.user;
}

export async function addBonobo(userId){
  return await supabaseServiceRole.auth.admin.updateUserById(
    userId,
    { app_metadata: { role: 'bonobo' } }
  );
}