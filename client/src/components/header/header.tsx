import React from 'react'
import {NavLink} from 'react-router-dom'
interface Iheader {
    logOut: (e: React.MouseEvent) => void
}
export const Header: React.FC<Iheader> = ({logOut}) => {
    return (
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/" className="brand-logo">Logo</NavLink>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Main page</NavLink></li>
                    <li><NavLink to="/add">Add todo</NavLink></li>
                    <li><NavLink to="/" onClick={logOut}>Log out</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}
