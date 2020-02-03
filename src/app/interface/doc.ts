export interface Doc {
    _id: string;
    title: string;
    path?: string;
    description: string;
    content?: string;
    modified: Date;
    created: Date;
    username?: string;
    userId: string;
    idCat: string[];
}
