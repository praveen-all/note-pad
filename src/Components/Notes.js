import React, { useContext, useEffect ,useRef ,useState} from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
export default function Notes(props) {
  const navigate=useNavigate();
  const { notes, fetchallNotes,editNote } = useContext(noteContext);
  const [state,setState]=useState({_id:"",etitle:"",edescription:"",etag:""});
  useEffect(() => {
    if(localStorage.getItem('token'))
    fetchallNotes();
    else
    navigate('/login');
  });
  
const ref=useRef(null);
const refClose=useRef(null);
  const updatenote = (note) => {

    ref.current.click();
    setState({etitle:note.title,edescription:note.description,etag:note.tag,_id:note._id});
  };


  

  const handleOnClick=(e)=>{
     e.preventDefault();
     editNote(state.etitle,state.edescription,state.etag,state._id);
     refClose.current.click();
     props.showAlert("Note updated successfully",'success')

  }

  const onchange=(e)=>{
           setState({...state,[e.target.name]:e.target.value})
  }

  return (
    <div>
      <Addnote showAlert={props.showAlert} />
      {/* adding model */}

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >

        
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
                
              > </button>
            </div>
            <div className="modal-body">
{/* inserting form */}
<form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              value={state.etitle}
              aria-describedby="emailHelp"
              onChange={onchange}
            />
        
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
            description
            </label>
            <textarea
              rows={3}
              type="text"
              className="form-control"
              id="edescription"
              onChange={onchange}
              name="edescription"
              value={state.edescription}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={state.etag}
            />
        
          </div>
        
          
        </form>
{/* Ending form */}


            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled={state.etitle.length<5 || state.edescription.length<5} type="button" className="btn btn-primary" onClick={handleOnClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container">{notes.length===0 && '☺️ No notes to display ☺️'}</div> 
        {notes &&
          notes.map((el) => {
            return <NoteItem key={el._id} updatenote={updatenote} showAlert={props.showAlert} note={el} />;
          })}
      </div>
    </div>
  );
}
