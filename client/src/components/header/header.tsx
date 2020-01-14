import React from 'react'
import {NavLink} from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Main page</NavLink></li>
                    <li><NavLink to="/add">Add todo</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
