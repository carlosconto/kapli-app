import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './reducers/bookSlice'

export default configureStore({
    reducer: {
        book: bookReducer,
    }
})