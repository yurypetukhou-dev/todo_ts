import React from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";

interface ILoginProps {
    login: () => void
}

const Login: React.FC<ILoginProps> = ({login}) => {
    let history = useHistory()
    const handleLogin = () => {
        login();
        localStorage.setItem('user', "true")
        history.push('/')
        window.location.reload()
    }

    return (<div className="row">
            <div className="col s12 center-align">Login</div>
            <form className="col s12" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="icon_prefix" type="text" className="validate"/>
                        <label htmlFor="icon_prefix">First Name</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="icon_telephone" type="password" className="validate"/>
                        <label htmlFor="icon_telephone">Login</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={handleLogin}>Login
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}

export default connect(null, dispatch => {
    return {
        login: () => dispatch({type: "LOGIN", payload: true})
    }
})(Login)