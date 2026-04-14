import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithReAuth} from "./baseQueryWithReauth.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
});