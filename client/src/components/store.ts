import {createStore} from 'redux'
import authReducer from '../reducers/auth'

const init = {
    user: null
}
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
    }
}
export const store = createStore(authReducer, init , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())