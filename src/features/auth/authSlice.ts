import {decodeToken, getAccessToken, getRefreshToken} from "../../utils/tokenUtil.ts";
import {createSlice} from "@reduxjs/toolkit";

export interface AuthState {
    id: string | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
    roles: string[] | undefined;
    permissions: string[] | undefined;
    isAuthenticated: boolean;
}

const accessToken = getAccessToken();
const refreshToken = getRefreshToken();

const decodedAccessToken = decodeToken(accessToken);

const initialState: AuthState = {
    id: decodedAccessToken?.id,
    accessToken,
    refreshToken,
    roles: decodedAccessToken?.roles,
    permissions: decodedAccessToken?.permissions,
    isAuthenticated: !!accessToken
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: () => {},
});

export default authSlice.reducer;