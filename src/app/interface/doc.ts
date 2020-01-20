export interface Doc {
    _id: string;
    title: string;
    path?: string;
    description: string;
    content?: string;
    modified: Date;
    created: Date;
    userId: string;
    idCat: string
}
