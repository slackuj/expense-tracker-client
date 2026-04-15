export interface LoginResponseData {
    accessToken: string;
}

export interface RefreshResponseData {
    accessToken: string;
}

export interface RegisterResponseData {
    email: string;
    expiresAt: number;// expiry timestamp
}

export interface UserLoginRequest {
    email: string;
    password: string;
}

export interface UserRegisterRequest  {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserConfirmationRequest  {
    email: string;
    code: string;
}

export interface ResendConfirmationCodeRequest  {
    email: string;
}