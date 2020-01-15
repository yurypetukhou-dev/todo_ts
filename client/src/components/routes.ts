import React from 'react'
import {SecretRoute} from "./secretRote";
import {connect} from "react-redux";

interface IMain {
    user: boolean,
    login: () => void
}

const Routes: React.FC<IMain> = ({user, login}) => {
    // @ts-ignore
    let isLogin = user;
    if (localStorage.getItem("user")) {
        isLogin = true
        login()
    }
    const useRoutes = SecretRoute(isLogin)
    return useRoutes
}


export default connect((state:any) => {
  return {
      user: state.user
  }
},  (dispatch) => {
    return {
        login: () => dispatch({type: 'LOGIN', payload: true})
    }
})(Routes)
