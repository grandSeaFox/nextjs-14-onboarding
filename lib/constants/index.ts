import { Login, Register } from '../types/auth';

export * from './routes';

export const SIGN_IN: Login = 'login';
export const SIGN_UP: Register = 'register';

export const { NEXT_APPWRITE_DATABASE_ID: DATABASE_ID, NEXT_APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID } = process.env;

export const APPWRITE_COOKIE_SESSION = 'appwrite-session';
