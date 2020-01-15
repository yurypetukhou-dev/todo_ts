import React from "react";

interface ILoginProps {
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleLogin: () => void,
    err: string
}

const Login: React.FC<ILoginProps> = ({handleInput, handleLogin, err}) => {

    return (
        <div className="row">
            <div className="col s12 center-align">Login</div>
            <form className="col s12" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input id="icon_prefix" type="text" className="validate"  name='email' onChange={handleInput}/>
                        <label htmlFor="icon_prefix">First Name</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="icon_telephone" type="password" className="validate" name='password' onChange={handleInput}/>
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

export default Login