//     @Id
// @Column(name = "tconst")
// private String tconst;

import exp from "constants";

// @Column(name = "primary_title")
// private String primaryTitle;

// @Column(name = "original_title")
// private String originalTitle;

// @Column(name = "is_adult")
// private Boolean isAdult;

// @Column(name = "start_year")
// private Integer startYear;

// @Column(name = "end_year")
// private Integer endYear;

// @Column(name = "runtime_minutes")
// private Integer runtimeMinutes;

// @Column(name = "title_type")
// private String titleType;

// @Column(name = "genres")
// private String genres;

// @Column(name = "directors")
// private String directors;

// @Column(name = "writers")
// private String writers;

export class MoveDetailsView {
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

    constructor(data: Partial<MoveDetailsView>) {
        this.tconst = data.tconst;
        this.primaryTitle = data.primaryTitle;
        this.originalTitle = data.originalTitle;
        this.isAdult = data.isAdult;
        this.startYear = data.startYear;
        this.endYear = data.endYear;
        this.runtimeMinutes = data.runtimeMinutes;
        this.titleType = data.titleType;
        this.genres = data.genres;
        this.directors = data.directors;
        this.writers = data.writers;
    }
}