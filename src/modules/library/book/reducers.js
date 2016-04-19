import { createReducer } from '../../../utils';

import { FETCH_BOOKS_SUCCESS, FETCH_BOOKS_REQUEST, FETCH_BOOKS_FAILURE,
         FETCH_BOOK_SUCCESS, FETCH_BOOK_FAILURE, FETCH_BOOK_STATE_RESET,
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

const listBooksReducer = createReducer(fetchBooksInitState, {

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

//==================== Reducer for viewing book ====================
const viewBookInitState = {
    book    : null,
    error   : null,
}

const viewBookReducer = createReducer(viewBookInitState, {

    [FETCH_BOOK_SUCCESS]: (state, payload) => {
        return {...state, book: payload.book};
    },
    [FETCH_BOOK_FAILURE]: (state, payload) => {
        return {...state, error: payload.error};
    },
    [FETCH_BOOK_STATE_RESET] : (state) => {
        return {...state, error: null, book: null };
    }
});

//==================== Reducer for single book CRUD ====================
const editleBookInitState = {
    error         : null,
    savedSuccess  : false
}

const editBookReducer = createReducer(editleBookInitState, {

    [CREATE_BOOK_SUCCESS]: (state) => {
        return { ...state, savedSuccess: true, error: null };
    },
    [CREATE_BOOK_FAILURE]: (state, payload) => {
        return { ...state, savedSuccess: false, error: payload.error };
    },
    [CREATE_BOOK_STATE_RESET]: (state) => {
        return { ...state, savedSuccess: false, error: null };
    }
});


//==================== export reducers ====================
export { listBooksReducer, viewBookReducer, editBookReducer };