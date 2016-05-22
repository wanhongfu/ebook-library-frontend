import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

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

    put(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload,
            params
        });
    }

    patch(requestUrl, payload = {}) {
        return this.request({
            url: requestUrl,
            method: 'put',
            body: payload
        });
    }

    post(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload,
            params
        });
    }

    postForUploadFile(requestUrl, payload = {}, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'post',
            body: payload,
            contentType: 'multipart/form-data',
            params
        });
    }

    delete(requestUrl, params = {}) {
        return this.request({
            url: requestUrl,
            method: 'delete',
            params
        });
    }

    request({ url, method, params = {}, body, contentType }) {
        //if (this.authToken) {
        //    /* eslint-disable */
        //    params.token = this.authToken;
        //    /* eslint-enable */
        //}
        const JSON_CONTENT_TYPE = 'application/json'
        contentType = contentType || JSON_CONTENT_TYPE;
        const paramUndefined = params === undefined || params === null;

        const urlWithQuery = paramUndefined ? `${url}` : `${url}?${queryString.stringify(params)}`;

        let headers  = {
            'Accept': 'application/json'
        };
        if(contentType === JSON_CONTENT_TYPE) {
            headers = {
                ...headers,
                'Content-Type': JSON_CONTENT_TYPE
            }
        }
        const init = { method, headers: headers };
        if (method !== 'get' && method !== 'head') {
            init.body = (contentType === JSON_CONTENT_TYPE) ? JSON.stringify(body) : body;
        }

        return fetch(`${this.prefix}/${urlWithQuery}`, init)
            .then(checkHttpStatus)
            .then(res => { return parseJSON(res) })
            .catch(error => {throw error});
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }
}
