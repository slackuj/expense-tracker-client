import {apiSlice} from "../../api/apiSlice.ts";
import {createEntityAdapter, createSelector, type EntityState} from "@reduxjs/toolkit";
import type {User} from "../../types/user.ts";
import {config} from "../../config.ts";
import type {ApiResponse} from "../../types/response.ts";
import type {RootState} from "../../store/store.ts";
import {getUserId} from "../auth/authSlice.ts";

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

/***********************************************/
/*** INJECTING AUTH ENDPOINTS INTO APISLICE  ***/
/***********************************************/

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<EntityState<User, string>, void>({
            query: () => config.endpoints.users,
            transformResponse: (response: ApiResponse<User[]>) => usersAdapter.setAll(initialState, response.data),
        }),
    }),
});

export const {
    useGetUsersQuery,
} = usersApiSlice;

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();
const selectUsersData = createSelector(
    selectUsersResult,
    // fallback
    result => result.data ?? initialState
);

// selectors
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = usersAdapter.getSelectors(selectUsersData);

export const selectCurrentUser = (state: RootState) => {
    const userId = getUserId(state);
    if (userId) {
        return selectUserById(state, userId);
    }
}