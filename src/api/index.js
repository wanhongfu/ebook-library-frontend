import ApiClient from './ApiClient';
import config from '../config';

import BookAPI from './BookAPI';

function prepareApi() {
    const apiClient = new ApiClient({prefix: config.baseUrl});
    return {
        books: new BookAPI({ apiClient: apiClient })
    }
}

const api = prepareApi();
export default api;