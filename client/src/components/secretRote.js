import {Route, Switch} from "react-router-dom";
import ToDo from "./todo";
import Header from './header';
import React from "react";
import LoginPage from "./auth/login";
import Registr from "./auth/registr";

export const SecretRoute = (isAuth)  => {
    if (isAuth) {
        return (
            <>
                <Header/>
                <div className='container'>
                    <Switch>
                        <Route exact path='/add' component={ToDo}/>
                    </Switch>
                </div>
            </>
        )
    } else {
        return (
            <div className='container'>
                <Switch>
                    <Route exact path='/login' component={LoginPage}/>
                    <Route   path='/registr' component={Registr}/>
                    <Route component={LoginPage}/>
                </Switch>

            </div>
        )

    }
}