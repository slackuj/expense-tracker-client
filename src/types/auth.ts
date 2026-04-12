export interface LoginResponseData {
    accessToken: string;
}

export type RefreshResponseData = LoginResponseData;

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