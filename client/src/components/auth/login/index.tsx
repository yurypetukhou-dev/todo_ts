import React, {useState} from "react";
import Login from './login'
import axios from "axios";
import {useHistory} from "react-router";
import {connect} from "react-redux";

var deсoder = require('jwt-decode');

interface IloginPage {
    login: (user:any) => void
}

const LoginPage: React.FC<IloginPage> = ({login}) => {

    const history = useHistory()
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })

    const [err, setErr] = useState<string>('')

    const handleLogin = async () => {

        try {
            const logIn = await axios.post('api/auth', {
                email: userInput.email,
                password: userInput.password
            })

            if (logIn) {
                const decoderedJwt = deсoder(logIn.data.token)
                localStorage.setItem('user', JSON.stringify(decoderedJwt.id))
                login(decoderedJwt)
                history.push('/')
            }
        } catch (e) {
            const errMsg = e.response.data.msg
            setErr(errMsg)
        }

    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    return (
        <Login err={err} handleLogin={handleLogin} handleInput={handleInput}/>
    )
}
export default connect(null, (dispatch) => {
    return {
        login: (user: any) => dispatch({type: "LOGIN", payload: user})
    }
})(LoginPage)