import { defineMiddleware } from "astro:middleware";
import micromatch from "micromatch";
import { getUser } from "../lib/supabase";

/* 
Used the following example to create this auth middleware https://github.com/kevinzunigacuellar/astro-supabase/blob/main/src/middleware/index.ts
on each ssr request this middleware will be run
if the request path is in the protected route list, if the user isn't signed in, it will redirect.
This also sets to locals.email to the current user email, if it's not null. 
*/
const protectedRoutes = ["*/auth/dashboard*", "*/dnd*"];

export const auth = defineMiddleware(async ({ locals, url, cookies, redirect }, next) => {
    const user = await getUser(cookies);
    if(micromatch.isMatch(url.pathname, protectedRoutes)){
        if (!user) {
            return redirect("/auth/signin");
        }   
    }
    locals.email = user?.email;
    const response = await next();
    return response;
});
