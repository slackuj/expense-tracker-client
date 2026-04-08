export interface LoginResponseData {
    accessToken: string;
    refreshToken: string;
}



export interface UserLoginRequest {
    email: string;
    password: string;
}