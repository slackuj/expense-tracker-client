import {decodeToken, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken} from "../../utils/tokenUtil.ts";
import {createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice.ts";
import type {LoginResponseData, UserLoginRequest} from "../../types/auth.ts";
import {config} from "../../config.ts";
import type {ApiResponse} from "../../types/response.ts";

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
0
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.login.matchFulfilled, (state, action) => {
                const { accessToken, refreshToken } = action.payload;
                if ( accessToken && refreshToken ) {
                    state.accessToken = accessToken;
                    state.refreshToken = refreshToken;

                    // consider performing non-state update tasks outside the reducer ??? such as in onQueryStarted/Updated method ... also can transform response to match the required payload !?
                    setAccessToken(accessToken);
                    setRefreshToken(refreshToken);

                    const decodedAccessToken = decodeToken(accessToken);
                    state.id = decodedAccessToken?.id;
                    state.roles = decodedAccessToken?.roles;
                    state.permissions = decodedAccessToken?.permissions;
                    state.isAuthenticated = true;
                }
            }
        );
    },
});

export default authSlice.reducer;

/***********************************************/
/*** INJECTING AUTH ENDPOINTS INTO APISLICE  ***/
/***********************************************/

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation< LoginResponseData,UserLoginRequest>({
            query: (userLoginRequestData) => ({
                url: config.endpoints.login,
                method: "POST",
                body: userLoginRequestData
            }),
            // notice if this is equivalent to response.data.data !? ---> i.e is `return response.data` handled automatically by RTK Query as specified ?
            transformResponse: (response: ApiResponse<LoginResponseData>) => response.data,
        }),
    }),
});

export const {
    useLoginMutation,
} = authApiSlice;