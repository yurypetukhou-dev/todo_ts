import React from 'react'
import {IToDo} from "../../../../../interfaces/toDo";
//@ts-ignore
import Fade from 'react-reveal/Fade';

interface IListProps {
    toDos: IToDo[],
    deleteItem: (id: string, e?: React.MouseEvent) => void,
    handelEdit: (id: string, e: any) => void,
    setEdit: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handelKeyPress: (id: string, e: React.KeyboardEvent<HTMLInputElement>) => void
    editTitle: string,
    myRefs: any,
    myNoteRefs: any
}

const List: React.FC<IListProps> = ({toDos, deleteItem, handelEdit, setEdit, editTitle, handelKeyPress, myRefs, myNoteRefs}) => {
    return (

        <ul className='collection todo_list'>
            {
                toDos.map((item) => (
                        <Fade top key={item.noteId}>
                            <li className="collection-item viewNote" id={item.noteId}
                                ref={el => myNoteRefs.current[item.noteId] = el} >
                                <input type="text"
                                       ref={el => myRefs.current[item.noteId] = el}
                                       className={!item.view ? 'no_viewInp' : "viewInp"}
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEdit(e)}
                                       onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => handelKeyPress(item.noteId, e)}
                                       value={editTitle}
                                />
                                <span className={item.view ? 'no_view' : "view"}>{item.title}</span>
                                <span>
                            <i className="material-icons" id={item.noteId}
                               onClick={(e) => handelEdit(item.noteId, e)}>create</i>
                            <i className="material-icons delete" data-del={item.noteId} onClick={(e) => deleteItem(item.noteId, e)}>delete</i>
                        </span>
                            </li>
                        </Fade>
                    )
                )}
        </ul>
    )
}

export default List
