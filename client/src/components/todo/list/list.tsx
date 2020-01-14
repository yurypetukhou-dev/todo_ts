import React from 'react'
import {IToDo} from "../../../../../interfaces/toDo";

interface IListProps {
    toDos: IToDo[],

}
const List: React.FC<IListProps> = ({toDos}) => {
    return (
        <ul>
            {
                toDos.map((item) => <li key={item.id}>{item.title}</li>)
            }
        </ul>
    )
}

export default List
