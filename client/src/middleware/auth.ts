import axios from 'axios';

interface Iauth {
    token: boolean
}
export function setAuthorizationToken<Iauth>(token:boolean) {
    if(token) {
        axios.defaults.headers.common['authorization'] = token;
    } else {
        delete axios.defaults.headers.common['authorization'];
    }
}