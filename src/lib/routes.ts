export const LOGIN_PATH = '/auth/login';
export const RESIGISTER_PATH = '/auth/register';
export const ROOT_PATH = '/';

export const PUBLIC_ROUTES: string[] = [
    '/api/auth/callback/google',
    '/api/auth/callback/github',
];

export const PROTECTED_ROUTES = [
    { path: '/admin', roles: ['admin'] },
    { path: '/user/profile', roles: ['user', 'admin'] },
    { path: '/settings', roles: ['admin', 'editor'] },
    { path: '/dashboard', roles: ['user'] },
];
