import Base from './Base';

export default class BookAPI extends Base {

    list(param) {
        return this.apiClient.get('api/books', {}, param);
    }

    get(id, param) {
        return this.apiClient.get(`api/books/${id}`, {}, param);
    }

    save(book, token) {
        if(book.id) {
            return this.apiClient.put(`api/books/${book.id}`, {...book}, {token: token});
        } else {
            return this.apiClient.post(`api/books`, {...book}, {token: token});
        }
    }
}