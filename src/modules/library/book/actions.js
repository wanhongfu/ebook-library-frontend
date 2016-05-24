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

                setTimeout(() => {//simulate the data loading is very slow
                    dispatch({
                        type    : FETCH_BOOKS_SUCCESS,
                        payload : {
                            datalist    : response.content,
                            currentPage : response.number+1,
                            totalRecNum : response.totalElements,
                            pageSize    : response.size
                        }
                    })
                }, 1000);
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

//==================== Actions for book CRUD ====================
export const SAVE_BOOK_SUCCESS       = 'library/book/save/success';
export const SAVE_BOOK_FAILURE       = 'library/book/save/failure';
export const UPDATE_BOOK_STATE_RESET = 'library/book/state/reset';

export function saveBook(book) {
    return (dispatch) => {

        dispatch(mkSaveBookResetAction());
        
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;

        api.books.save(book, _token).then(response => {
            dispatch({type: SAVE_BOOK_SUCCESS});
        }).catch(error => {
            dispatch({type: SAVE_BOOK_FAILURE, payload: { error }});
        });
    }
}

export const DELETE_BOOK_SUCCESS    = 'library/book/delete/success';
export const DELETE_BOOK_FAILURE    = 'library/book/delete/failure';

export function deleteBook(book) {
    return (dispatch) => {
        dispatch(mkSaveBookResetAction());
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;

        api.books.delete(book.id, _token).then(response => {
            dispatch({type: DELETE_BOOK_SUCCESS});
        }).catch(error => {
            dispatch({type: DELETE_BOOK_FAILURE, payload: { error }});
        });
    }
}

export function resetSaveBookState() {
    return (dispatch) => {
        dispatch(mkSaveBookResetAction())
    }
}

export const UPLOAD_BOOK_IMG_SUCCESS    = 'library/book/img/upload/success';
export const UPLOAD_BOOK_IMG_FAILURE    = 'library/book/img/upload/failure';
export function uploadBookImg(bookId, formData) {
    return (dispatch) => {
        const _token = sessionStorage.getItem('token') || '';
        if(_token.length <= 0) return;

        api.books.uploadBookImg(bookId, _token, formData).then(response => {
            dispatch({type: UPLOAD_BOOK_IMG_SUCCESS});
        }).catch(error => {
            dispatch({type: UPLOAD_BOOK_IMG_FAILURE, payload: { error }});
        });
    }
}

//=============================
// internal use functions
//=============================
function mkSaveBookResetAction() {
    return {
        type: UPDATE_BOOK_STATE_RESET
    };
}