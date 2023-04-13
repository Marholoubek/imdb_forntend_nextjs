
export class Profession {
    id?: number;
    name?: string;

    constructor(data: Partial<Profession>) {
        this.id = data.id;
        this.name = data.name;
    }
}