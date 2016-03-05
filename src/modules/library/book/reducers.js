import { FetchBookConstants } from './actions';
import { createReducer } from '../../../utils';

const initialState = {
    books: [],
    error: null
};

export default createReducer(initialState, {

    [FetchBookConstants.FETCH_BOOK_SUCCESS]: (state, payload) => {
        return { ...state, books: payload.books, error: null };
    },

    [FetchBookConstants.FETCH_BOOK_FAILURE]: (state, payload) => {
        //const error = [payload.error].concat(state.error);
        return { ...state, books: null, error: payload.error };
    }
});

