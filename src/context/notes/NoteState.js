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
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzQ0ZmY2YjMwYzQ2NGUzN2IwYjczIn0sImlhdCI6MTczNDEwMDIzN30.VwS6U3dLbH_6PfeHDy1rr0EIqKRdmvsXWQiFIwpbYzA",
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the note.");
      }
  
      const json = await response.json();
      console.log("Edited note response:", json);
  
      // Update the note in the state
      let newNote = [...note];
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if (element._id === id) {
          newNote[index].title = title;
          newNote[index].description = description;
          newNote[index].tag = tag;
          break;
        }
      }
      setNote(newNote);
    } catch (error) {
      console.error("Error updating note:", error);
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
      setNote(newNotes);

  };

  return (
    <NoteContext.Provider value={{ note, addNote, editNote, deleteNote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
