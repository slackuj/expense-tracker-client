import type { ReactNode } from "react";
import { useAppSelector } from "../hooks/storeHooks";
import {appRoles} from "../constants/roles";
import {getUserAuth, getUserPermissions, getUserRoles} from "../features/auth/authSlice.ts";
import {Navigate} from "react-router";

interface ProtectedRouteProps {
    children: ReactNode;
    requiredPermission: string;
}

export const ProtectedRoute = ({ children, requiredPermission } : ProtectedRouteProps) => {
    const isAuthenticated = useAppSelector(getUserAuth);
    const roles = useAppSelector(getUserRoles);
    const permissions = useAppSelector(getUserPermissions);
    const isSuperAdmin = roles  && roles.includes(appRoles.SUPER_ADMIN.name);

    if (!isAuthenticated) {
        // implement re-trying to access the requested page later
        return <Navigate to="/login" replace />;
    }
    // Check against the current user permissions
    const authorized = permissions && permissions.includes(requiredPermission);

    const isAuthorized = isSuperAdmin || authorized;

    // If user is not authorized, maybe navigate or maybe show some kind of error
    if (!isAuthorized) {
        // return <Navigate to="/" replace />
        return <h1>You do not have sufficient permission to access this resource</h1>
    }

    return <>{children}</>
}