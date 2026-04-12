import { Route, Routes } from "react-router";
import {LoginPage} from "../features/auth/LoginPage.tsx";
import {UserPage} from "../features/users/UserPage.tsx";
import {RegisterPage} from "../features/auth/RegisterPage.tsx";
import {HomePage} from "../features/app/HomePage.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route index element={<HomePage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/*<Route
                path="/all-users"
                element={
                    <ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}>
                        <AllUsers />
                    </ProtectedRoute>
                }
            />*/}

            {/*<Route path="/users/:id" element={<ProtectedRoute requiredPermissions={[appPermissions.VIEW_USERS.name]}><UserPage /></ProtectedRoute>} />*/}
            <Route path="/users/:id" element={<UserPage />} />

            <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}