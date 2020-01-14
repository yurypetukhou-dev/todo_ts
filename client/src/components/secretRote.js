import {Redirect, Route, Switch} from "react-router-dom";
import {ToDo} from "./todo";
import Header from './header';
import React from "react";
import Login from "./auth/login/login";
import {Registr} from "./auth/registr/registr";


export const SecretRoute = (isAuth)  => {
    if (isAuth) {
        return (
            <>
                <Header/>
                <div className='container'>

                    <Switch>
                        <Route exact path='/' component={ToDo}/>
                    </Switch>
                </div>
            </>
        )
    } else {
        return (
            <div className='container'>
                <Switch>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/registr' component={Registr}/>
                </Switch>
                <Redirect to='/login' />
            </div>
        )

    }
}