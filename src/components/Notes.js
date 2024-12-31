import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  let navigate  = useNavigate ();
  const {showalert} = props;
  const context = useContext(noteContext);
  const { note, getnote, editNote } = context;

  const [currentNote, setCurrentNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    if(localStorage.getItem('token')){

      getnote();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  console.log("Auth Token:", localStorage.getItem("token"));

  const updateNote = (currentNote) => {
    setCurrentNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    ref.current.click();
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(currentNote.id, currentNote.etitle, currentNote.edescription, currentNote.etag);
    refClose.current.click();
    props.showalert("Edited Successfully", "success")

  };
  

  const onChange = (e) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNotes showalert={showalert}/>
   
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
                    value={currentNote.etitle}
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
                    value={currentNote.edescription}
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
                    value={currentNote.etag}
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
        {Array.isArray(note) && note.map((noteItem) => {
  return <Noteitem key={noteItem._id} updateNote={updateNote} note={noteItem} showalert={showalert}/>;
})}

      </div>
    </>
  );
};

export default Notes;
