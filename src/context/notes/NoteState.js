import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];
  

  const [note, setNote] = useState(notesinitial);


 // get all notes
 const getnote = async () => {
  //API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
   method: "GET",
   headers:{
   "Content-Type": "Application/json",
   "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzQ0ZmY2YjMwYzQ2NGUzN2IwYjczIn0sImlhdCI6MTczNDEwMDIzN30.VwS6U3dLbH_6PfeHDy1rr0EIqKRdmvsXWQiFIwpbYzA"
   },

   });
   const json=  await response.json();
     console.log(json);
  setNote(json)
   };



   const addNote = async (title, description, tag) => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzQ0ZmY2YjMwYzQ2NGUzN2IwYjczIn0sImlhdCI6MTczNDEwMDIzN30.VwS6U3dLbH_6PfeHDy1rr0EIqKRdmvsXWQiFIwpbYzA",
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      // Parse the response
      const jsonResponse = await response.json();
  
      // Log the response
      console.log("Adding note", jsonResponse);
  
      // Add the new note to the state (use server response)
      setNote([...note, jsonResponse]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  


  // Edit note
  const editNote = async(id, title, description, tag) => {

    //API call
      const response = await fetch(`${host}/api/notes/updatenote/{$id}`, {
      method: "POST",
      headers:{
      "Content-Type": "Application/json",
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzQ0ZmY2YjMwYzQ2NGUzN2IwYjczIn0sImlhdCI6MTczNDEwMDIzN30.VwS6U3dLbH_6PfeHDy1rr0EIqKRdmvsXWQiFIwpbYzA"
      },
      body: json.stringify({title, description, tag})
      });
      const json=  response.json();
      

  for (let index = 0; index < note.length; index++) {
    const element = note[index];
    if(element._id === id){
      element.title= title;
      element.description= description;
      element.tag= tag;
    }
    
  }
  };

  // Delete note
  const deleteNote = async (id) => {
 
//API call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers:{
      "Content-Type": "Application/json",
      "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzQ0ZmY2YjMwYzQ2NGUzN2IwYjczIn0sImlhdCI6MTczNDEwMDIzN30.VwS6U3dLbH_6PfeHDy1rr0EIqKRdmvsXWQiFIwpbYzA"
      },
    
      });
      const json=  response.json();
      console.log(json);
      const newNotes = note.filter((note) => note._id !== id);
  };

  return (
    <NoteContext.Provider value={{ note, addNote, editNote, deleteNote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
