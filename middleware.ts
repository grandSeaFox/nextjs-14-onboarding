import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { stringifyParse } from '@/lib/utils';
import { APPWRITE_COOKIE_SESSION, COUNTRY_CITY_ROUTE, HOME_ROUTE, INPUTS_ROUTE, MULTISELECT_ROUTE, LOGIN_ROUTE } from './lib/constants';

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get(APPWRITE_COOKIE_SESSION);
  const user = userCookie ? stringifyParse(userCookie) : null;

  const currentRoute = req.nextUrl.pathname;

  if (!user && ['/', HOME_ROUTE, MULTISELECT_ROUTE, INPUTS_ROUTE, COUNTRY_CITY_ROUTE].includes(currentRoute)) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl.origin));
  }

  if (user && currentRoute === '/') return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl.origin));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
