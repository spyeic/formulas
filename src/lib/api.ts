export interface ShareRequest {
    op: "add" | "get";
    formula?: string;
    id?: string;
}

export interface ShareResponse {
    id?: string;
    formula?: string;
}

export interface APIResponse<T> {
    status: number;
    body?: T;
}