import { NextResponse } from "next/server"
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

    //Check existing cookie on the browser
    if(!req.cookies.has('sid')) {
        const signinUrl = new URL('/auth/sign-in', req.url)
        return NextResponse.redirect(signinUrl)
    } 
    return NextResponse.next();

  }
  
// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
matcher: [
    '/dashboard',
    '/products/:path*',

],
}
