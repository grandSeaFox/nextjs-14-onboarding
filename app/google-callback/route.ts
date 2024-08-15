import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { getLoggedInUser } from '@/lib/actions/auth.actions';
import { createAdminClient } from '@/lib/clients/appwrite';
import { HOME_ROUTE, REGISTRATION_ROUTE, REGISTRATION_ROUTE_FORM } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  const { account } = await createAdminClient();

  if (!userId || !secret) return NextResponse.redirect(`${request.nextUrl.origin}${REGISTRATION_ROUTE}`);

  const session = await account.createSession(userId!, secret!);

  cookies().set('appwrite-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  const result = await getLoggedInUser();
  if (result.success) {
    const redirectUrl = result.data.completed ? HOME_ROUTE : REGISTRATION_ROUTE_FORM;

    return NextResponse.redirect(`${request.nextUrl.origin}${redirectUrl}`);
  }
}
