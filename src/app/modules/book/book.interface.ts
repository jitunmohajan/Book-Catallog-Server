export type IBookFilterRequest = {
    search?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    title?: string | undefined;
    author?: string | undefined;
    genre?: string | undefined;
}