import React, {useEffect, useState, useRef} from 'react';
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
    const myRefs = useRef([])
    const myNoteRefs = useRef([])

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
                    noteId: `${Date.now()}`,
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
        setToDoTitle(e.target.value.trimStart())
    }


    const handelDelete = async (id: string, e?: React.MouseEvent) => {
        // @ts-ignore
        const targetId = e.target.getAttribute('data-del')
        try {
           const deletedItem = await axios.delete(`api/todo/${id}`)
            if(deletedItem) {
                // @ts-ignore
                myNoteRefs.current[targetId].classList.add('deleted')
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    const handleEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTitle(e.target.value)
    }

    const handelKeyPress = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handelEdit(id)
        }
    }

    const handelEdit = (id: string, e?: any) => {

        if (e) {
            //@ts-ignore
            myRefs.current[e.target.id].focus()
        }
        setEditTitle('')
        const changedArr = toDos.map((item) => {

                if (item.noteId === id) {
                    item.view = !item.view
                    item.title = editTitle ? editTitle : item.title
                    axios.put(`api/todo/${id}`, {
                        note: item
                    })
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
            <List
                toDos={toDos}
                deleteItem={handelDelete}
                handelEdit={handelEdit}
                setEdit={handleEditTitle}
                editTitle={editTitle}
                handelKeyPress={handelKeyPress}
                myRefs={myRefs}
                myNoteRefs={myNoteRefs}
            />
        </React.Fragment>
    )
}
export default connect((state: any) => {
    return {
        owner: state.user
    }

})(ToDo)


