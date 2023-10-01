export interface IMovie {
    id: number;
    name: string;
    category: string;
    duration: number;
    price: number
}
export interface IMovieUpdate{
    name?: string;
    category?: string;
    duration?: number;
    price?: number
}
export interface IField{
    key: string;
    required?: boolean;
    min?: number;
    max?: number;
    regex?: {
        expression: RegExp,
        message: string;
    }
}