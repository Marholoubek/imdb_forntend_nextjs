export class TitleType {
    id?: number;
    name?: string;

    constructor(data: Partial<TitleType>) {
        this.id = data.id;
        this.name = data.name;
    }
}