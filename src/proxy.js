import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request) {
    const path = request.nextUrl.pathname;

    // Get session
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    const isLoggedIn = !!session?.user;

    // If logged in and trying to access login/register page -> redirect to dashboard
    if ((path === '/login' || path === '/register') && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If not logged in and trying to access dashboard -> redirect to login
    if (path.startsWith('/dashboard') && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow all other routes
    return NextResponse.next();
}

// Config - Only run on these paths
export const config = {
    matcher: ['/login', '/register', '/dashboard/:path*'],
};