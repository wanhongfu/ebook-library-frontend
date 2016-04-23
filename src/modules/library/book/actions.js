import api from '../../../api';

//==================== Actions for fetching currentBookReducer list ====================
export const FETCH_BOOKS_REQUEST = 'library/books/fetch/request';
export const FETCH_BOOKS_SUCCESS = 'library/books/fetch/success';
export const FETCH_BOOKS_FAILURE = 'library/books/fetch/failure';

export function fetchBooks({page, size, sort}) {
    return (dispatch) => {

        dispatch({ type : FETCH_BOOKS_REQUEST });

        api.books.list({page, size, sort})
            .then(response => {
                dispatch({
                    type    : FETCH_BOOKS_SUCCESS,
                    payload : {
                        datalist    : response.content,
                        currentPage : response.number+1,
                        totalRecNum : response.totalElements,
                        pageSize    : response.size
                    }
                })
            }).catch(error => {
                dispatch({
                    type    : FETCH_BOOKS_FAILURE,
                    payload : {
                        error
                    }
                });
            });
    };
}

//==================== Actions for fetching single currentBookReducer ====================
export const FETCH_BOOK_SUCCESS     = 'library/book/fetch/success';
export const FETCH_BOOK_FAILURE     = 'library/book/fetch/failure';
export const FETCH_BOOK_STATE_RESET = 'library/book/fetch/reset';

export function fetchSingleBook(id) {
    return (dispatch) => {
        api.books.get(id).then(book => {
            dispatch({ type: FETCH_BOOK_SUCCESS, payload: { book }});
        }).catch(error => {
            dispatch({ type: FETCH_BOOK_FAILURE, payload: { error }});
        });
    }
}

export function resetViewBookState() {
    return (dispatch) => {
        dispatch({ type: FETCH_BOOK_STATE_RESET });
    }
}

//==================== Actions for creating currentBookReducer ====================
export const CREATE_BOOK_SUCCESS     = 'library/book/create/success';
export const CREATE_BOOK_FAILURE     = 'library/book/create/failure';
export const CREATE_BOOK_STATE_RESET = 'library/book/state/reset';

export function saveBook(book) {
    return (dispatch) => {

        dispatch(mkSaveBookResetAction());
        
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;

        api.books.save(book, _token).then(response => {
            dispatch({type: CREATE_BOOK_SUCCESS});
        }).catch(error => {
            dispatch({type: CREATE_BOOK_FAILURE, payload: { error }});
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
        type: CREATE_BOOK_STATE_RESET
    };
}