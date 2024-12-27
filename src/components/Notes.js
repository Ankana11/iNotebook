import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import AddNotes from "./AddNotes";

const Notes = () => {
  const context = useContext(noteContext);
  const { note, getnote } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", title: "", description: "", tag: "default" });

  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    getnote();
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    setCurrentNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    ref.current.click();
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating the note:", currentNote);
    refClose.current.click();
  };

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes />
   
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={currentNote.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={currentNote.description}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={currentNote.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

     
      <div className="row my-3">
        <h4>Your Notes</h4>
        {note.length === 0 && "No notes to display"}
        {note.map((noteItem) => {
          return <Noteitem key={noteItem._id} updateNote={updateNote} note={noteItem} />;
        })}
      </div>
    </>
  );
};

export default Notes;
