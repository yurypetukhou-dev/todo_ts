import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {SecretRoute} from "./components/secretRote";
import {store} from "./components/store";
import {Provider} from 'react-redux'

const App: React.FC = () => {
    // @ts-ignore
    let isLogin = false
    if(localStorage.getItem("user")) {
        isLogin = true
        store.dispatch({type: 'LOGIN', payload: true})
    }
    const useRoutes = SecretRoute(isLogin)
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    {useRoutes}
                </Router>
            </Provider>
        </div>
    );
}

export default App;
