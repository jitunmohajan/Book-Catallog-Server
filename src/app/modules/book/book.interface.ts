export type IBookFilterRequest = {
    search?: string | undefined;
    minPrice?: string | undefined;
    maxPrice?: string | undefined;
    category?: string | undefined;
    title?: string | undefined;
    author?: string | undefined;
    genre?: string | undefined;
}