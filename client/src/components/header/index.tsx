import React from "react";
import {Header} from "./header";
import {connect} from "react-redux";

interface IheaderPage {
    logOut: () => void
}
const HeaderPage: React.FC<IheaderPage> = ({logOut}) => {

    const handleLogOut = (e: React.MouseEvent) => {
        localStorage.removeItem('user')
        logOut()
    }
    return (
        <Header logOut={handleLogOut}/>
    )
}
export default connect(null, dispatch => {
    return {
        logOut: () => dispatch({type: 'LOGOUT'})
    }
})(HeaderPage)