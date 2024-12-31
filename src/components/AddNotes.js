import React from 'react'
import { useContext } from 'react'
import noteContext from "../context/notes/noteContext.js"
import { useState } from 'react';

const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note , setNote] = useState({title: "", description: "", tag: "default"});

    const handleClick = (e) => {
      e.preventDefault();
      if (note.title.trim() === "" || note.description.trim() === "") {
        alert("Title and Description are required!");
        return;
      }
      addNote(note.title, note.description, note.tag);
      props.showalert("Added Successfully", "success")
    };
    

    const onChange= (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
    }
  return (
  
    <div className="container my-3">
    <h4>Add a Note</h4>
    <form>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
 
</div>
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
</div>
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}/>
</div>

<button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
</form>
</div>
  )
}

export default AddNotes
