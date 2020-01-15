import React, {useState} from "react";
import {Registr} from "./registr";
import axios from 'axios'
import {useHistory} from "react-router";

const RegistrPage: React.FC = () => {
    const [userInput, setUserInput] = useState<object>({
        email: '',
        password: ''
    })
    const [err, setErr] = useState<string>('')

    let history = useHistory()

    const handleReg = async () => {
        try {
            const reg = await axios.post('api/registration', {...userInput})

            if (reg) {
                history.push('/login')
            }
        } catch (e) {
            const errMsg = e.response.data.msg
            setErr(errMsg)
        }

    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }


    return <Registr sendReg={handleReg} err={err}   handleInput={handleInput}/>

}

export default RegistrPage
