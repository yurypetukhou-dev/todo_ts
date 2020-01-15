import React, {useState} from "react";
import Login from './login'
import axios from "axios";
import {useHistory} from "react-router";
import {connect} from "react-redux";
import {emit} from "cluster";

interface IloginPage {
    login: () => void
}

const LoginPage: React.FC<IloginPage> = ({login}) => {

    const history = useHistory()
    const [userInput, setUserInput] = useState({
        email: '',
        password: ''
    })

    const [err, setErr] = useState<string>('')

    const handleLogin = async () => {
        console.log('login  <------------------')
        try {
            const logIn = await axios.post('api/auth', {
                email: userInput.email,
                password: userInput.password
            })

            if (logIn) {
                login()
                history.push('/')
            }
        } catch (e) {
            const errMsg = e.response.data.msg
            setErr(errMsg)
        }

    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handleInput  <------------------')
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }

    return (
        <Login err={err} handleLogin={handleLogin} handleInput={handleInput}/>
    )
}
export default connect(null, (dispatch) => {
   return {
       login: () => dispatch({type: "LOGIN", payload: true})
   }
})(LoginPage)