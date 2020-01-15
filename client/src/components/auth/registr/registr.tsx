import React from "react";

interface IReg {
    err: string,
    sendReg: () => void,
    handleInput:(e: React.ChangeEvent<HTMLInputElement>) => void
}


export const Registr: React.FC<IReg> = ({sendReg, err, handleInput}) => {

    return (

        <div className="row">
            {
                err
                    ? <div className='  red center-align' style={{width: '50%', margin: '0 auto', padding: '10px 0px'}}>
                        {err}
                    </div>
                    : null
            }
            <div className="col s12 center-align">Registration</div>
            <form className="col s12" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">account_circle</i>
                        <input id="icon_prefix" type="text" className="validate" name='email' onChange={ handleInput}/>
                        <label htmlFor="icon_prefix">First Name</label>
                    </div>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="icon_telephone" type="password" className="validate" name='password'  onChange={ handleInput }/>
                        <label htmlFor="icon_telephone">Password</label>
                    </div>
                </div>

                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={sendReg}>Registr
                    <i className="material-icons right">send</i>
                </button>
            </form>
        </div>
    )
}
