import React from 'react';
import './App.css';
import Header from './components/header'
import {BrowserRouter as Router} from "react-router-dom";

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Header/>
            </Router>
        </div>
    );
}

export default App;
