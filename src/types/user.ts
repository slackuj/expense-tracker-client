export interface UserSession {
    userId: string;
    refreshToken: string;
    expiresAt: Date;
}

export interface AuthenticatedUser {
    id: string;
    email: string;
    name: string;
    password: string;
    roles: string[];// array of role names
    permissions: string[];// array of permission names
}

export interface EditUserRolesRequest {
    roles: string[];
}

/*
YOU ALSO NEED TO CHECK ACCESS TOKEN, WHEN OPERATIONS ARE BEING CARRIED OUT VIA USER'S ACCOUNT.
THEREFORE, POSTPONED FOR NOW !!!
----> ALSO CONSIDER THE SCENARIO FOR DELETION !!!
type UserDataUpdateRequest =  Partial<Omit<UserRegisterRequest, 'password' | 'confirmPassword'>>;
type UsePasswordUpdateRequest = Pick<UserRegisterRequest, 'email' | 'password' | 'confirmPassword'>;*/
