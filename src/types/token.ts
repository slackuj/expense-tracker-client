export interface AccessToken {
    id: string;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
    iat: number;
    exp: number;
}