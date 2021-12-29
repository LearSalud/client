export interface AuthResponse {
    ok: boolean;
    uid: string;
    name: string;
    email: string;
    token: string;
    msg?: string;
    dbUser?: any;
}

export interface Usuario {
    uid: string;
    name: string;
    email?: string;
}