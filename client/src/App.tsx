import React from 'react';
import './App.css';
import Routes from "./components/routes";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from 'react-redux'
import {store} from "./components/store";

const App: React.FC = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <Router>
                    <Routes />
                </Router>
            </Provider>
        </div>
    );
}

export default App;
