import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../config.ts";
import type {RootState} from "../store/store.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: config.apiBaseURI,
        prepareHeaders: (headers, { getState }) => {
            const accessToken = ( getState() as RootState ).auth.accessToken;
            if (accessToken){
                // set accessToken
                headers.set("authorization", `Bearer ${accessToken}`);
            }
            return headers;
        },
        credentials: "include",
    }),
    endpoints: () => ({}),
});