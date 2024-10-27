import {
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
    convexAuthNextjsMiddleware,
} from "@convex-dev/auth/nextjs/server";


// TODO: Add all the routes that you want to be public
const isPublicRoute = createRouteMatcher(["/", "/auth", "/disclosure", "/privacy-policy"])

export default convexAuthNextjsMiddleware((req) => {
    if (!isPublicRoute(req) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(req, "/auth");
    }
});

export const config = { matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"] };