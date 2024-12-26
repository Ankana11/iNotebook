import { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"
import Noteitem from './Noteitem.js';
import AddNotes from './AddNotes'
const Notes = () => {
    const context = useContext(noteContext);
const {note, addNote} = context;
  return (
    <>
    <AddNotes/>
    <div className='row'>
       <h4>Your Note</h4>
      {note.map((note)=>{
        return <Noteitem key={note._id} note={note}/>;
      })}
    </div>
    </>
  )
}

export default Notes
