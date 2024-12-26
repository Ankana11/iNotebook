import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesinitial = [
    {
      "_id": "675c5e0409e19d75563975f3",
      "user": "675c44ff6b30c464e37b0b73",
      "title": "title",
      "description": "this is my description",
      "tag": "tag",
      "date": "2024-12-13T16:17:08.808Z",
      "__v": 0
    },
    {
      "_id": "675c5e0509e19d75563975f5",
      "user": "675c44ff6b30c464e37b0b73",
      "title": "title",
      "description": "this is my description",
      "tag": "tag",
      "date": "2024-12-13T16:17:09.009Z",
      "__v": 0
    },
    {
      "_id": "675c5e0509e19d75563975f7",
      "user": "675c44ff6b30c464e37b0b73",
      "title": "title",
      "description": "this is my description",
      "tag": "tag",
      "date": "2024-12-13T16:17:09.185Z",
      "__v": 0
    },
    {
      "_id": "675c5e0509e19d75563975f9",
      "user": "675c44ff6b30c464e37b0b73",
      "title": "title",
      "description": "this is my description",
      "tag": "tag",
      "date": "2024-12-13T16:17:09.388Z",
      "__v": 0
    },
    {
      "_id": "67601906b965409c9c2ca611",
      "user": "675c44ff6b30c464e37b0b73",
      "title": "title2",
      "description": "this is my 2nd description",
      "tag": "tag2",
      "date": "2024-12-16T12:11:50.365Z",
      "__v": 0
    }
  ];

  const [note, setNote] = useState(notesinitial);

  // Add note
  const addNote = (title, description, tag) => {
    console.log("Adding note");
    const newNote = {
      "_id": "67601906b965409c9c2ca6111",
      "user": "675c44ff6b30c464e37b0b73",
      "title": title,
      "description": description,
      "tag": tag,
      "date": new Date().toISOString(),
      "__v": 0
    };
    setNote([...note, newNote]); // Add the new note to the state
  };

  // Edit note
  const editNote = () => {
    // Edit note logic here
  };

  // Delete note
  const deleteNote = (id) => {
   console.log("deleting nots with id=" +id);
   const newNotes = note.filter((note) => note._id !== id);

   setNote(newNotes);
  };

  return (
    <NoteContext.Provider value={{ note, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
