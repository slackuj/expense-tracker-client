import { Route, Routes } from "react-router";
import {LoginPage} from "../features/auth/LoginPage.tsx";
import {UserPage} from "../features/users/UserPage.tsx";
import {RegisterPage} from "../features/auth/RegisterPage.tsx";
import {HomePage} from "../features/app/HomePage.tsx";
import {AllUsersPage} from "../features/users/AllUsersPage.tsx";
import {ProtectedRoute} from "./ProtectedRoute.tsx";
import {appPermissions} from "../constants/permissions.ts";
import {AuthenticatedRoute} from "./AuthenticatedRoute.tsx";
import {ConfirmPage} from "../features/auth/ConfirmPage.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/users/confirm" element={<ConfirmPage />} />
            <Route
                path="/users"
                element={
                    <ProtectedRoute requiredPermission={appPermissions.VIEW_USERS.name}>
                        <AllUsersPage />
                    </ProtectedRoute>
                }
            />

            <Route path="/users/:id"
                   element={
                       <ProtectedRoute requiredPermission={appPermissions.VIEW_USERS.name}>
                           <UserPage />
                       </ProtectedRoute>}
            />

            <Route path="/users/me"
                   element={
                       <AuthenticatedRoute>
                           <UserPage />
                       </AuthenticatedRoute>}
            />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}