import React from "react";
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"
const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = useContext(noteContext);
  return (
      <div className="col-md-3">
        <div className="card my-3">
          <div className="card-body ">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>
            <i class="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
            <i class="fas fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
        </div>
      </div>
  
  );
};

export default Noteitem;
