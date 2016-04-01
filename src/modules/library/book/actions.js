import { createConstants } from '../../../utils';
import api from '../../../api';

export const FetchBookConstants = createConstants(
    'FETCHING_BOOK_LIST',
    'FETCH_BOOK_LIST_SUCCESS',
    'FETCH_BOOK_LIST_FAILURE',

    'FETCH_BOOK_SUCCESS',
    'FETCH_BOOK_FAILURE',

    'CREATE_BOOK',
    'CREATE_BOOK_SUCCESS',
    'CREATE_BOOK_FAILURE',
    'CREATE_BOOK_STATE_RESET'
);

export function fetchBooks(param) {

    return (dispatch) => {
        dispatch(fetchingBooks());
        api.books.list(param)
            .then(res => setTimeout(() => dispatch(fetchBooksSuccess(res)), 1000))
            .catch(error => {
                dispatch(fetchBooksFailure(error));
            });
    };
}

function fetchingBooks() {
    return {
        type: FetchBookConstants.FETCHING_BOOK_LIST,
        payload: {
            fetching: true
        }
    };
}

function fetchBooksSuccess(response) {
    return {
        type: FetchBookConstants.FETCH_BOOK_LIST_SUCCESS,
        payload: {
            books: response.content,
            fetching: false,

            //TODO need to be refactored
            currentPage: response.number+1,
            totalRecNum: response.totalElements,
            pageSize: response.size
        }
    };
}

function fetchBooksFailure(error) {
    return {
        type: FetchBookConstants.FETCH_BOOK_LIST_FAILURE,
        payload: {
            error: error,
            fetching: false
        }
    };
}

export function fetchSingleBook(id) {
    return (dispatch) => {
        api.books.get(id).then(book => {
            dispatch({type: FetchBookConstants.FETCH_BOOK_SUCCESS, payload: {book: book}});
        }).catch(error => {
            dispatch({type: FetchBookConstants.FETCH_BOOK_FAILURE, payload: {error: error}});
        });
    }
}

export function saveBook(book) {
    return (dispatch) => {
        dispatch(mkSaveBookResetAction());
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;
        api.books.save(book, _token).then(response => {
            dispatch({type: FetchBookConstants.CREATE_BOOK_SUCCESS});
        }).catch(error => {
            dispatch({type: FetchBookConstants.CREATE_BOOK_FAILURE, payload: {error: error}});
        });
    }
}

export function resetSaveBookState() {
    return (dispatch) => {
        dispatch(mkSaveBookResetAction())
    }
}

function mkSaveBookResetAction() {
    return {
        type: FetchBookConstants.CREATE_BOOK_STATE_RESET
    };
}