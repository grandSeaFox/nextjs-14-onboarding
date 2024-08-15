'use server';

import { cookies, headers } from 'next/headers';
import { detectAndApplyChanges, handleError, stringifyParse } from '@/lib/utils';
import { Account, AppwriteException, ID, OAuthProvider, Query } from 'node-appwrite';
import { getUserInfoProps } from '@/lib/types/user';
import { OnboardingProps, SignInProps, SignUpParams } from '@/lib/types/auth';
import { createAdminClient, createSessionClient } from '@/lib/clients/appwrite';
import { APPWRITE_COOKIE_SESSION, DATABASE_ID, USER_COLLECTION_ID } from '@/lib/constants';
import { ApiResponse } from '@/lib/types';

export const getUserInfo = async ({ userId }: getUserInfoProps): Promise<ApiResponse> => {
  try {
    const { database } = await createAdminClient();

    const userResponse = await database.listDocuments(DATABASE_ID!, USER_COLLECTION_ID!, [Query.equal('userId', userId)]);
    const userNumber = await database.listDocuments(DATABASE_ID!, USER_COLLECTION_ID!);

    if (userResponse.documents.length > 0) {
      return { success: true, data: stringifyParse({ ...userResponse.documents[0], totalUsers: userNumber.total }) };
    }
    return { success: true, data: {} };
  } catch (error: any) {
    return handleError(error);
  }
};

export const signIn = async ({ email, password }: SignInProps): Promise<ApiResponse> => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(APPWRITE_COOKIE_SESSION, session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    if (!user.success) {
      return user;
    }
    return { success: true, data: user.data };
  } catch (error: any) {
    return handleError(error);
  }
};

export const createAccount = async ({ email, password }: SignUpParams): Promise<ApiResponse> => {
  try {
    const { account } = await createAdminClient();
    const newUserAccount = await account.create(ID.unique(), email, password);
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set(APPWRITE_COOKIE_SESSION, session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    return { success: true, data: stringifyParse(newUserAccount) };
  } catch (error: any) {
    return handleError(error);
  }
};

export const createOauth2Session = async () => {
  try {
    const origin: string | null = headers().get('origin');
    const { account }: { account: Account } = await createAdminClient();
    const redirectUrl = await account.createOAuth2Token(OAuthProvider.Google, `${origin}/google-callback`, `${origin}/sign-up`);

    return {
      success: true,
      redirectUrl,
    };
  } catch (error: any) {
    console.error('error', error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const upsertUser = async ({ userId, name, completed, ...userData }: OnboardingProps, formStepKey: string): Promise<ApiResponse> => {
  const { database } = await createAdminClient();
  const { account } = await createSessionClient();

  let currentUserState = {
    userId,
    completed: completed,
    formAnswersByStepKey: {
      [formStepKey]: {
        ...userData,
      },
    },
    lastCompletedStep: formStepKey,
  };

  try {
    const existingUsers = await database.listDocuments(DATABASE_ID!, USER_COLLECTION_ID!, [Query.equal('userId', userId)]);

    if (existingUsers.total === 0 && name) {
      await account.updateName(name);
      const newUser = await database.createDocument(DATABASE_ID!, USER_COLLECTION_ID!, ID.unique(), {
        ...currentUserState,
        formAnswersByStepKey: JSON.stringify(currentUserState.formAnswersByStepKey),
      });
      return { success: true, data: stringifyParse(newUser) };
    }

    const userDocument = existingUsers.documents[0];

    const existingFormAnswersByStepKey = JSON.parse(userDocument.formAnswersByStepKey);

    const updatedFormAnswersByStepKey = detectAndApplyChanges(existingFormAnswersByStepKey, currentUserState.formAnswersByStepKey);

    const updatedUser = await database.updateDocument(DATABASE_ID!, USER_COLLECTION_ID!, userDocument.$id, {
      ...currentUserState,
      formAnswersByStepKey: JSON.stringify(updatedFormAnswersByStepKey),
      completed,
    });
    return { success: true, data: stringifyParse(updatedUser) };
  } catch (error: any) {
    return handleError(error);
  }
};

export const getLoggedInUser = async (): Promise<ApiResponse> => {
  try {
    const { account } = await createSessionClient();

    const result = await account.get();
    const user = await getUserInfo({ userId: result.$id });

    const jointUser = stringifyParse('data' in user ? { ...result, ...user.data } : result);
    if (!jointUser.email) throw new AppwriteException('No user found.');

    return { success: true, data: jointUser };
  } catch (error: any) {
    return handleError(error);
  }
};

export const logoutAccount = async (): Promise<ApiResponse> => {
  try {
    const { account } = await createSessionClient();

    cookies().delete(APPWRITE_COOKIE_SESSION);

    await account.deleteSession('current');
    return { success: true };
  } catch (error: any) {
    return handleError(error);
  }
};
