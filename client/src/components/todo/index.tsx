import React, {useEffect, useState} from 'react';
import List from "./list/list";
import {IToDo} from "../../../../interfaces/toDo";

declare global {
    interface Window {
        M: any;
    }
}

let M = window.M
export const ToDo: React.FC = () => {
    const [toDos, setTodos] = useState<IToDo[]>([{title: 'dsdas', id: 1}, {title: 'dsdas', id: 2}, {
        title: 'dsdas',
        id: 3
    }])
    const [toDoTitle, setToDoTitle] = useState<string>('')
    useEffect(() => {
        window.M.updateTextFields()
    })

    const addTodo = (e: React.KeyboardEvent) => {

        if (e.key === 'Enter' && toDoTitle) {
            console.log('sds')
            let newToDo: IToDo = {
                title: toDoTitle,
                id: Date.now()
            }

            setTodos([...toDos, newToDo])
            setToDoTitle('')
        }
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDoTitle(e.target.value.trim())

    }

    return (
        <React.Fragment>
            <div className="row" style={{
                marginTop: '2rem'
            }}>
                <div className="input-field col s12">
                    <input placeholder="Placeholder"
                           id="first_name"
                           type="text"
                           className="validate"
                           onKeyPress={addTodo}
                           onChange={(e) => handelChange(e)}
                           value={toDoTitle}
                    />

                           <label htmlFor="first_name">First Name</label>
                </div>
            </div>

            <List toDos={toDos}/>
        </React.Fragment>
    )
}


