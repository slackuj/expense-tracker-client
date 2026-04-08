export interface Permission {
    id: string;
    name: string;
    description: string;
}

export type CreatePermissionRequest = Omit<Permission, 'id'>;
export type EditPermissionRequest = Partial<CreatePermissionRequest>;