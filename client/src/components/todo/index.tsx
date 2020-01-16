import React, {useEffect, useState} from 'react';
import List from "./list/list";
import {IToDo} from "../../../../interfaces/toDo";
import axios from 'axios'
import {connect} from "react-redux";


declare global {
    interface Window {
        M: any;
    }
}
let M = window.M

interface ItoDo {
    owner: string
}

const ToDo: React.FC<ItoDo> = ({owner}) => {

    const [toDos, setTodos] = useState<IToDo[]>([])
    const [toDoTitle, setToDoTitle] = useState<string>('')
    const [editTitle, setEditTitle] = useState<string>('')

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect(() => {
        axios.get('api/todo/', {
            params: {
                owner: owner
            }
        })
            .then(list => setTodos(list.data))
    }, [owner])

    const addTodo = async (e: React.KeyboardEvent) => {
        try {
            if (e.key === 'Enter' && toDoTitle) {

                let newToDo: IToDo = {
                    title: toDoTitle,
                    _id: `${Date.now()}`,
                    owner: owner,
                    view: false
                }
                //ToDo хотелось бы сделать что бы фронт не был связон с беком ->> в том плане что если бек отвалился и наши задачи не попали в базу ?
                setTodos([...toDos, newToDo])
                axios.post("api/todo/add", newToDo)
                setToDoTitle('')
            }
        } catch (e) {
            console.error(e.message)
        }
    }

    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDoTitle(e.target.value.trim())
    }

    const handelDelete = (id: string) => {
        console.log('----------------------------- del')
        const deletedItem = axios.delete(`api/todo/${id}`)
        if (deletedItem) {
            setTodos(toDos.filter((item) => item._id !== id))
        }
    }

    const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value)
    }

    const handelEdit = (id: string) => {
        console.log(editTitle, '------- edit')

        const changedArr = toDos.map((item) => {

                if (item._id === id) {
                    item.view = !item.view
                    item.title = editTitle

                } else {
                    item.view = false
                }
                return item
            }
        )

        setTodos(changedArr)
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
            <List toDos={toDos} deleteItem={handelDelete} handelEdit={handelEdit} setEdit={handleEditTitle}/>
        </React.Fragment>
    )
}
export default connect((state: any) => {
    return {
        owner: state.user
    }

})(ToDo)


