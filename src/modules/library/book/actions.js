import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { parseJSON, checkHttpStatus, createConstants } from '../../../utils';

export const FetchBookConstants = createConstants(
    'FETCH_BOOK',
    'FETCHING_BOOK',
    'FETCH_BOOK_SUCCESS',
    'FETCH_BOOK_FAILURE'
);

export function fetchBooks() {

    return (dispatch) => {
        const endpoint = `${config.baseUrl}/api/books`;

        fetch(endpoint, { method: 'GET' })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                setTimeout(() => {
                    dispatch(fetchBooksSuccess(response));
                }, 1000);
            })
            .catch(error => {
                dispatch(fetchBooksFailure(error));
            });
    };
}

export function fetchingBooks() {
    return {
        type: FetchBookConstants.FETCHING_BOOK,
        payload: {
            fetching: true
        }
    };
}

export function fetchBooksSuccess(bookList) {
    return {
        type: FetchBookConstants.FETCH_BOOK_SUCCESS,
        payload: {
            books: bookList,
            fetching: false
        }
    };
}

export function fetchBooksFailure(error) {
    return {
        type: FetchBookConstants.FETCH_BOOK_FAILURE,
        payload: {
            error: error
            //status: error.response.status,
            //statusText: error.response.statusText
        }
    };
}
