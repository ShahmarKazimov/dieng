// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl

    if (searchParams.has('lang')) {
        return NextResponse.next()
    }

    if (
        pathname.startsWith('/_next/') ||
        pathname.startsWith('/api/') ||
        pathname.includes('.')
    ) {
        return NextResponse.next()
    }

    const langFromCookie = request.cookies.get('preferred-language')?.value
    const acceptLanguage = request.headers.get('accept-language')
    const browserLang = acceptLanguage?.split(',')[0]?.split('-')[0]

    const defaultLang = langFromCookie ||
        (browserLang === 'de' ? 'de' : 'en') ||
        'en'

    const url = request.nextUrl.clone()
    url.searchParams.set('lang', defaultLang)

    return NextResponse.redirect(url)
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico).*)']
}