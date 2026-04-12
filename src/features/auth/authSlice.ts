import {
    decodeToken,
    getAccessToken,
    getPersistSession,
    setAccessToken,
    setPersistSession
} from "../../utils/tokenUtil.ts";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice.ts";
import type {LoginResponseData, RefreshResponseData, UserLoginRequest, UserRegisterRequest} from "../../types/auth.ts";
import {config} from "../../config.ts";
import type {ApiResponse} from "../../types/response.ts";
import type {RootState} from "../../store/store.ts";
import type {AccessToken} from "../../types/token.ts";

export interface AuthState {
    id: string | undefined;
    accessToken: string | undefined;
    roles: string[] | undefined;
    permissions: string[] | undefined;
    isAuthenticated: boolean;
    isSessionPersisted: boolean;
}

const accessToken = getAccessToken();
const persistSession = getPersistSession();
const decodedAccessToken = decodeToken(accessToken) as AccessToken;

const initialState: AuthState = {
    id: decodedAccessToken?.id,
    accessToken,
    roles: decodedAccessToken?.roles,
    permissions: decodedAccessToken?.permissions,
    isAuthenticated: !!decodedAccessToken,
    isSessionPersisted: persistSession,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            isAnyOf( authApiSlice.endpoints.login.matchFulfilled, authApiSlice.endpoints.refresh.matchFulfilled),
            (state, action) => {
                const { accessToken } = action.payload;
                if ( accessToken ) {
                    state.accessToken = accessToken;

                    setAccessToken(accessToken);
                    setPersistSession(true);
                    // consider performing non-state update tasks outside the reducer ??? such as in onQueryStarted/Updated method ... also can transform response to match the required payload !?

                    const decodedAccessToken = decodeToken(accessToken) as AccessToken;
                    state.id = decodedAccessToken?.id;
                    state.roles = decodedAccessToken?.roles;
                    state.permissions = decodedAccessToken?.permissions;
                    state.isAuthenticated = true;
                    state.isSessionPersisted = true;
                }
            }
        );
        builder.addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled, (state) => {
                state.id = undefined;
                state.accessToken = undefined;
                state.roles = undefined;
                state.permissions = undefined;
                state.isAuthenticated = false;
                state.isSessionPersisted = false;
            }
        );
    },
});

export default authSlice.reducer;

// selectors
export const getUserId = (state: RootState) => state.auth.id;
export const getUserAuth = (state: RootState) => state.auth.isAuthenticated;
export const getUserRoles = (state: RootState) => state.auth.roles;
export const getUserPermissions = (state: RootState) => state.auth.permissions;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const getSessionPersistence = (state: RootState) => state.auth.isSessionPersisted;

/***********************************************/
/*** INJECTING AUTH ENDPOINTS INTO APISLICE  ***/
/***********************************************/

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation< LoginResponseData, UserLoginRequest>({
            query: (userLoginRequestData) => ({
                url: config.endpoints.login,
                method: "POST",
                body: userLoginRequestData
            }),
            transformResponse: (response: ApiResponse<LoginResponseData>) => response.data,
        }),
        // endpoint for logout
        logout: builder.mutation< {success: boolean}, void>({
            query: () => ({
                url: config.endpoints.logout,
                method: "POST",
            }),
        }),
        // endpoint for registering new user
        register: builder.mutation<{ success: boolean}, UserRegisterRequest>({
            query: (userRegisterRequestData) => ({
                url: config.endpoints.register,
                method: "POST",
                body: userRegisterRequestData
            }),
        }),
        // endpoint for refreshing user
        refresh: builder.mutation< RefreshResponseData, void>({
            query: () => ({
                url: config.endpoints.refresh,
                method: "POST",
            }),
            transformResponse: (response: ApiResponse<LoginResponseData>) => response.data,
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useRefreshMutation,
} = authApiSlice;