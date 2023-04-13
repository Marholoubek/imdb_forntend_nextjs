import { Movie } from './movie';
import { Profession } from './profession';

export class Actor {
    id?: string;
    primaryName?: string;
    birthYear?: number;
    deathYear?: number | null;
    primaryProfession?: Profession[];
    knownForTitles?: Movie[] | string;

    constructor(data: Partial<Actor>) {
        this.id = data.id;
        this.primaryName = data.primaryName;
        this.birthYear = data.birthYear;
        this.deathYear = data.deathYear;
        this.primaryProfession = data.primaryProfession;
        this.knownForTitles = data.knownForTitles;
    }
}