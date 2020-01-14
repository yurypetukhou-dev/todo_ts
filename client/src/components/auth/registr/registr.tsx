import React from "react";

export const Registr: React.FC = () => (

    <div className="row">
        <div className="col s12 center-align">Login</div>
        <form className="col s12">
            <div className="row">
                <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="icon_prefix" type="text" className="validate" />
                    <label htmlFor="icon_prefix">First Name</label>
                </div>
                <div className="input-field col s12">
                    <i className="material-icons prefix">phone</i>
                    <input id="icon_telephone" type="tel" className="validate" />
                    <label htmlFor="icon_telephone">Telephone</label>
                </div>
            </div>

            <button className="btn waves-effect waves-light" type="submit" name="action">Registr
                <i className="material-icons right">login</i>
            </button>
        </form>
    </div>
)
