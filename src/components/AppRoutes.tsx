import { Route, Routes } from "react-router";
import {Login} from "../features/auth/Login.tsx";
import {UserPage} from "../features/users/UserPage.tsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/*<Route index element={<Home />} />*/}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<></>} />
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