
export default class Book {
    id: number;
    title: string;
    author: string;
    description?: string;
    genre: string;
    chapters?: any[];

    constructor(id: number, title: string, author: string, genre: string, description?: string, chapters: any[] = []) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.genre = genre;
        this.chapters = chapters;
    }

    public static create(id: number, title: string, author: string, genre: string, description?: string, chapters: any[] = []): Book {
        return new Book(id, title, author, genre, description, chapters);
    }
}