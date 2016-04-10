import { createReducer } from '../../../utils';

import { FETCH_BOOKS_SUCCESS, FETCH_BOOKS_REQUEST, FETCH_BOOKS_FAILURE,
         FETCH_BOOK_SUCCESS, FETCH_BOOK_FAILURE,
         CREATE_BOOK_SUCCESS, CREATE_BOOK_FAILURE, CREATE_BOOK_STATE_RESET
} from './actions';

//==================== Reducer for fetching booksReducer ====================
const fetchBooksInitState = {
    fetching    : false,
    datalist    : [],
    error       : null,
    currentPage : 0,
    totalRecNum : 0,
    pageSize    : 0
};

const booksReducer = createReducer(fetchBooksInitState, {

    [FETCH_BOOKS_REQUEST]: (state) => {
        return {...state, fetching: true};
    },

    [FETCH_BOOKS_SUCCESS]: (state, payload) => {
        return {
            ...state,
            fetching    : false,
            datalist    : payload.datalist,
            currentPage : payload.currentPage,
            totalRecNum : payload.totalRecNum,
            pageSize    : payload.pageSize,
        };
    },

    [FETCH_BOOKS_FAILURE]: (state, payload) => {
        return {...state, error: payload.error, fetching: false};
    }
});

//==================== Reducer for single currentBookReducer CRUD ====================
const singleBookInitState = {
    book    : null,
    error   : null,
    createdSuccess  : false,
    createError     : null,
}

const currentBookReducer = createReducer(singleBookInitState, {

    [FETCH_BOOK_SUCCESS]: (state, payload) => {
        return {...state, book: payload.book};
    },
    [FETCH_BOOK_FAILURE]: (state, payload) => {
        return {...state, error: payload.error};
    },

    [CREATE_BOOK_SUCCESS]: (state) => {
        return { ...state, createdSuccess: true };
    },
    [CREATE_BOOK_FAILURE]: (state, payload) => {
        return { ...state, createdSuccess: false, createError: payload.error };
    },
    [CREATE_BOOK_STATE_RESET]: (state) => {
        return { ...state, createdSuccess: false, createError: null };
    }
});


//==================== export reducers ====================
export { booksReducer, currentBookReducer };