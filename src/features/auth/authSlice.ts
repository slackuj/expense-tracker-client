import {decodeToken, getAccessToken, setAccessToken} from "../../utils/tokenUtil.ts";
import {createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "../../api/apiSlice.ts";
import type {LoginResponseData, UserLoginRequest} from "../../types/auth.ts";
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
}

const accessToken = getAccessToken();
const decodedAccessToken = decodeToken(accessToken) as AccessToken;

const initialState: AuthState = {
    id: decodedAccessToken?.id,
    accessToken,
    roles: decodedAccessToken?.roles,
    permissions: decodedAccessToken?.permissions,
    isAuthenticated: !!decodedAccessToken
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApiSlice.endpoints.login.matchFulfilled, (state, action) => {
                const { accessToken } = action.payload;
                if ( accessToken ) {
                    state.accessToken = accessToken;

                    setAccessToken(accessToken);
                    // consider performing non-state update tasks outside the reducer ??? such as in onQueryStarted/Updated method ... also can transform response to match the required payload !?

                    const decodedAccessToken = decodeToken(accessToken) as AccessToken;
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

// selectors
export const getUserId = (state: RootState) => state.auth.id;
export const getUserAuth = (state: RootState) => state.auth.isAuthenticated;

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
        // endpoint for logout
        logout: builder.mutation< {success: boolean}, void>({
            query: () => ({
                url: config.endpoints.logout,
                method: "POST",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
} = authApiSlice;