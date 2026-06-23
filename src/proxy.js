import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'
 

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(session?.user?.role == "lawyer" &&  session?.user?.plan === "free"){
        return NextResponse.redirect(new URL('/upgrade', request.url))
    }
    if(!session){
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  
}
 
export const config = {
  matcher: ['/dashboard/lawyer'],
}