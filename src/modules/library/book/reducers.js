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
        return {
            ...state,
            fetching: false,
            ...mkBookState(payload),
            ...mkPaginationState(payload)
        };
    },

    [FetchBookConstants.FETCH_BOOK_LIST_FAILURE]: (state, payload) => {
        return { ...state, ...mkBookState(payload), fetching: false };
    },

    [FetchBookConstants.FETCH_BOOK_SUCCESS]: (state, payload) => {
        return { ...state, ...mkBookState(payload) };
    },

    [FetchBookConstants.FETCH_BOOK_FAILURE]: (state, payload) => {
        return { ...state, ...mkBookState(payload) };
    }
});

function mkBookState(payload) {
    return {
        books: payload.books ? payload.books : null,
        book: payload.book ? payload.book : null,
        error: payload.error ? payload.error : null
    }
}

//TODO refactor this method to a common place for reuse
function mkPaginationState(payload) {
    return {
        currentPage: payload.currentPage,
        totalRecNum: payload.totalRecNum,
        pageSize: payload.pageSize
    };
}

export { books };