export interface LoginResponseData {
    accessToken: string;
}

export interface RefreshResponseData {
    accessToken: string;
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