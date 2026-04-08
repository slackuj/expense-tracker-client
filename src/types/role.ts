export interface Role {
    id: string;
    name: string;
    description: string;
    permissions: string[];// [permission names] that are converted into [permission IDs] inside roleService
}

export type CreateRoleRequest = Omit<Role, 'id'>;
export type EditRoleRequest = Partial<CreateRoleRequest>;