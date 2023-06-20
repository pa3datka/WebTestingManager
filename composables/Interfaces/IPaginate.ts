export interface IPaginate {
    current_page: number;
    first_page_url: string;
    prev_page_url: string;
    next_page_url: string;
    last_page_url: string;
    last_page: number;
    per_page: number;
    total: number;
    path: string;
}