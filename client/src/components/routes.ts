import React from 'react'
import {SecretRoute} from "./secretRote";
import {connect} from "react-redux";


interface IMain {
    user: any,
    login: (user: any) => void,
}

const Routes: React.FC<IMain> = ({user, login}) => {
    // @ts-ignore
    let isLogin = user;

    if (localStorage.getItem("user")) {
        const user = localStorage.getItem('user')
        login(JSON.parse(`${user}`))
    }
    const useRoutes = SecretRoute(isLogin)
    return useRoutes
}


export default connect((state: any) => {
    return {
        user: state.user
    }
}, (dispatch) => {
    return {
        login: (user: any) => dispatch({type: 'LOGIN', payload: user})
    }
})(Routes)
