export interface User {
    id?: string,
    displayName: string | null,
    email: string | null,
    phoneNumber: string | null,
    photoURL: string | null,
    providerId: string | null,
    rememberMe: boolean,
    role: string,
    uid: string | null,
    authUid: string,
}