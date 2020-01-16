import React from 'react'
import {IToDo} from "../../../../../interfaces/toDo";

interface IListProps {
    toDos: IToDo[],
    deleteItem: (id: string) => void,
    handelEdit: (id: string) => void,
    setEdit: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const List: React.FC<IListProps> = ({toDos, deleteItem, handelEdit, setEdit}) => {
    return (

        <ul className='collection todo_list'>
            {
                toDos.map((item) => (
                    <li className="collection-item" key={item._id}>
                        <input type="text" className={!item.view ? 'no_viewInp' : "viewInp"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEdit(e)}/>
                        <span className={item.view ? 'no_view' : "view"}>{item.title}</span>
                        <span>
                            <i className="material-icons" onClick={() => handelEdit(item._id)}>create</i>
                            <i className="material-icons delete" onClick={() => deleteItem(item._id)}>delete</i>
                        </span>
                    </li>)
                )}
        </ul>
    )
}

export default List
