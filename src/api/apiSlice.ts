import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {config} from "../config.ts";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: config.apiBaseURI}),
    endpoints: () => ({}),
});