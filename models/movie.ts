import { TitleType } from './titleType';
import { Genre } from './genre';
import { Actor } from './actor';

export class Movie {
    tconst?: string;
    titleType?: TitleType;
    primaryTitle?: string;
    originalTitle?: string;
    isAdult?: boolean;
    startYear?: number;
    endYear?: number | null;
    runtimeMinutes?: number;
    genres?: Genre[];
    directors?: Actor[]
    writers?: Actor[];

    constructor(data: Partial<Movie>) {
        this.tconst = data.tconst;
        this.titleType = data.titleType;
        this.primaryTitle = data.primaryTitle;
        this.originalTitle = data.originalTitle;
        this.isAdult = data.isAdult;
        this.startYear = data.startYear;
        this.endYear = data.endYear;
        this.runtimeMinutes = data.runtimeMinutes;
        this.genres = data.genres;
        this.directors = data.directors;
        this.writers = data.writers;
    }
}