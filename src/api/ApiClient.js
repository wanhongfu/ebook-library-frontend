import fetch from 'isomorphic-fetch';
import queryString from 'query-string';
import Promise     from 'bluebird';

import { parseJSON, checkHttpStatus } from '../utils';

export default class ApiClient {
    constructor({ prefix } = {}) {
        this.prefix = prefix;
    }

    get(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'get',
            body: payload,
            params
        });
    }

    put(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    patch(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    post(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload
        });
    }

    delete(requestUrl) {
        return this.request({
            url: requestUrl,
            method: 'delete'
        });
    }

    request({ url, method, params = {}, body }) {
        //if (this.authToken) {
        //    /* eslint-disable */
        //    params.token = this.authToken;
        //    /* eslint-enable */
        //}
        const paramUndefined = params === undefined || params === null;

        const urlWithQuery = paramUndefined ? `${url}` : `${url}?${queryString.stringify(params)}`;

        const init = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (method !== 'get' && method !== 'head') {
            init.body = body;
        }

        return fetch(`${this.prefix}/${urlWithQuery}`, init).then(res => {
            checkHttpStatus(res);
            return parseJSON(res);
        });
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }
}
