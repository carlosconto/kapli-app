import Book from '@/src/model/book'
import { createSlice } from '@reduxjs/toolkit'


interface AppState {
    openModal: boolean
    books: []
}

export const bookSlice = createSlice({
    name: 'book',
    initialState: {
        openModal: false,
        openModalChapter: false,
        books: [] as Book[],
        currenBook: {} as Book
    },
    reducers: {
        isOpen: (state) => {
            state.openModal = !state.openModal
        },
        isOpenModalChapter: (state) => {
            state.openModalChapter = !state.openModalChapter
        },
        addBook: (state, action: any) => {
            state.books.push(action.payload)
        },
        selectedBook: (state, action: any) => {
            state.currenBook = action.payload
        },
        clearBooks: (state) => {
            state.books = []
        },
        deleteBook: (state, action: any) => {
            state.books = state.books.filter((book: Book) => book.id !== action.payload)
        }
    }
})

// Action creators are generated for each case reducer function
export const { isOpen, addBook, clearBooks, deleteBook, isOpenModalChapter, selectedBook } = bookSlice.actions

export default bookSlice.reducer