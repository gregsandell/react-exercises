export type OmdbSearchItem = {
    Title: string;
    Year: string;
    imdbID: string;
    Type: 'movie' | 'series' | 'episode';
    Poster: string;
}

// Interface for a search query response
export type OmdbSearchResponse = {
    Search: OmdbSearchItem[];
    totalResults: string;
    Response: string // "True" or "False" (as a string)
}
