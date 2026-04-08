import {appPermissions} from "./permissions";

export const appRoles = {
    SUPER_ADMIN: {
        name: "SUPER_ADMIN",
        description: "Super admin role",
        permissions: []
    },
    ADMIN: {
        name: "ADMIN",
        description: "Admin role",
        permissions: [
            appPermissions.VIEW_ROLES.name,
            appPermissions.VIEW_PERMISSIONS.name,
            appPermissions.CREATE_USERS.name,
            appPermissions.MANAGE_USERS.name,
            appPermissions.MANAGE_USER_ROLES.name,
            appPermissions.VIEW_USERS.name,
        ]
    },
    USER: {
        name: "USER",
        description: "User role",
        permissions: []
    }
};