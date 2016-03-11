import { FetchBookConstants } from './actions';
import { createReducer } from '../../../utils';

const initialState = {
    fetching: false,
    books: [],
    error: null
};

export default createReducer(initialState, {

    [FetchBookConstants.FETCHING_BOOK]: (state) => {
        return { ...state, fetching: true };
    },

    [FetchBookConstants.FETCH_BOOK_SUCCESS]: (state, payload) => {
        return { ...state, books: payload.books, error: null, fetching: false };
    },

    [FetchBookConstants.FETCH_BOOK_FAILURE]: (state, payload) => {
        return { ...state, books: null, error: payload.error, fetching: false };
    }
});

