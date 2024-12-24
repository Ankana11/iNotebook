import { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"
import Noteitem from './Noteitem.js';
const Notes = () => {
    const context = useContext(noteContext);
const {note, setNote} = context;
  return (
    <div className='row'>
       <h4>Your Note</h4>
      {note.map((note)=>{
        return <Noteitem note={note}/>;
      })}
    </div>
  )
}

export default Notes
