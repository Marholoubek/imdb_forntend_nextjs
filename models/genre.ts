export class Genre {
    id?: number;
    name?: string;

    constructor(data: Partial<Genre>) {
        this.id = data.id;
        this.name = data.name;
    }
}