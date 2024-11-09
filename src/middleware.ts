import {auth} from "@/auth";

export { auth as middleware } from "@/auth"
/*

import {PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES} from "@/lib/routes";

export async function middleware(request) {
    const { nextUrl } = request;
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, nextUrl.pathname);

    // const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route))
    //     || nextUrl.pathname === ROOT) && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));

    const isPublicRoute = ((PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === LOGIN)
        && !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route)));
    console.log(isPublicRoute);

    console.log("is public route: ", isPublicRoute);
    if (!isAuthenticated && !isPublicRoute)
        return Response.redirect(new URL(LOGIN, nextUrl));
}*/

// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// };
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
