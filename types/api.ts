//probably not ideal to have all properties optional, but it's a quick fix for now
export interface Actor {
  id?: string;
  primaryName?: string;
  birthYear?: number;
  deathYear?: number | null;
  primaryProfession?: Profession[];
  knownForTitles?: Movie[] | string;
}

export interface Movie {
  tconst?: string;
  titleType?: TitleType;
  primaryTitle?: string;
  originalTitle?: string;
  isAdult?: boolean;
  startYear?: number;
  endYear?: number | null;
  runtimeMinutes?: number;
  genres?: Genre[];
  directors?: Actor[];
  writers?: Actor[];
}

export interface Genre {
  id?: number;
  name?: string;
}

export interface MoveDetailsView {
  tconst?: string;
  primaryTitle?: string;
  originalTitle?: string;
  isAdult?: boolean;
  startYear?: number;
  endYear?: number;
  runtimeMinutes?: number;
  titleType?: string;
  genres?: string;
  directors?: string;
  writers?: string;
}

export interface Profession {
  id?: number;
  name?: string;
}

export interface TitleType {
  id?: number;
  name?: string;
}
