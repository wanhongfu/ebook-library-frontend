import { FetchBookConstants } from './actions';
import { createReducer } from '../../../utils';

const initialState = {
    fetching: false,
    books: [],
    book: null,
    error: null,
    currentPage: 0,
    totalRecNum: 0
};

const books = createReducer(initialState, {

    [FetchBookConstants.FETCHING_BOOK_LIST]: (state) => {
        return { ...state, fetching: true };
    },

    [FetchBookConstants.FETCH_BOOK_LIST_SUCCESS]: (state, payload) => {
        return { ...state, books: payload.books,
            book: null, error: null, fetching: false,
            currentPage: payload.currentPage,
            totalRecNum: payload.totalRecNum };
    },

    [FetchBookConstants.FETCH_BOOK_LIST_FAILURE]: (state, payload) => {
        return { ...state, books: null, book: null, error: payload.error, fetching: false };
    },

    [FetchBookConstants.FETCH_BOOK_SUCCESS]: (state, payload) => {
        return { ...state, book: payload.book, error: null };
    },

    [FetchBookConstants.FETCH_BOOK_FAILURE]: (state, payload) => {
        return { ...state, book: null, error: payload.error };
    }
});

export { books };