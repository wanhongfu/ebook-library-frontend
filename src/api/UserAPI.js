import Base from './Base';

export default class UserAPI extends Base {

    login(email, password) {
        //not secure, don't use such manner to pass credential info to backend in real project
        return this.apiClient.get('api/accounts/login', {}, {email:email, password: password});
    }

    loadAccountByToken(token) {
        return this.apiClient.get('api/tokens', {}, {token:token});
    }

    logout(token) {
        return this.apiClient.get('api/accounts/logout', {}, {token:token});
    }

    create(user) {
        return this.apiClient.post('api/accounts', {...user}, {});
    }

}