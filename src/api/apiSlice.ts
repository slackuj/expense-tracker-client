import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../config.ts";
import type {LoginResponseData, UserLoginRequest} from "../types/auth.ts";
import type {ApiResponse} from "../types/response.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: config.apiBaseURI}),
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
} = apiSlice;