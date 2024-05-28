import HttpClient from "../shared/httpClient";

export default class BookService {

    static async getBooks() {
        const response = new HttpClient();

        await response.get('/books');

        if (response.status !== 200) {
            return [];
        }

        return response;
    }

    static async addBook(book: any) {
        const response = new HttpClient();
        await response.post('/books', book);

        return response;
    }

    static async deleteBook(id: number) {
        const response = new HttpClient();
        await response.delete(`/books/${id}`);

        return response;
    }

    static async getBook(id: number) {
        const response = new HttpClient();
        await response.get(`/books/${id}`);

        return response;
    }

    static async addChapter(book: any) {
        const response = new HttpClient();
        await response.post(`/chapters`, book);

        return response;
    }
}