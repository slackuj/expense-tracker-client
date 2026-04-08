// matches responseHelper.ts successResponse structure
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string | null;
    meta: any | null;
}