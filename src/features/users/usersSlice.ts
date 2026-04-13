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
        // fetch and upsert current user into RTK Query Cache
        // ONLY CALLED WHEN getUsers hasn't been called ( called on successful login for now )
        getMe: builder.query<User, void>({
            query: () => config.endpoints.me,
            transformResponse: (response: ApiResponse<User>) => response.data,

            // manually push user(me) into 'getUsers' cache entry as we know that RTK Query maintains separate entry for all endpoints in the cache
            async onQueryStarted(_, lifecycleApi){
                try {
                    const { data: me } = await lifecycleApi.queryFulfilled;
                    lifecycleApi.dispatch(
                        usersApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
                            usersAdapter.upsertOne(draft, me);
                        })
                    );
                } catch(error){
                    console.error("error fetching /users/me", error);
                }
            }
        }),
        // fetch and upsert user into RTK Query Cache
        // ONLY CALLED WHEN getUsers hasn't been called ( called in UserPage for now )
        getUser: builder.query<User, string>({
            query: (id) => `${config.endpoints.users}/${id}`,
            transformResponse: (response: ApiResponse<User>) => response.data,

            // manually push user into 'getUsers' cache entry as we know that RTK Query maintains separate entry for all endpoints in the cache
            async onQueryStarted(id, lifecycleApi){
                try {
                    const { data: user } = await lifecycleApi.queryFulfilled;
                    lifecycleApi.dispatch(
                        usersApiSlice.util.updateQueryData('getUsers', undefined, (draft) => {
                            usersAdapter.upsertOne(draft, user);
                        })
                    );
                } catch(error){
                    console.error(`error fetching /users/${id}`, error);
                }
            }
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useGetMeQuery,
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