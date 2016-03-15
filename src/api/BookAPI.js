import Base from './Base';

export default class BookAPI extends Base {

    list(param) {
        return this.apiClient.get('api/books', {}, param);
    }

    get(id, param) {
        return this.apiClient.get(`api/books/${id}`, {}, param);
    }
}