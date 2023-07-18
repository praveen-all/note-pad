import React ,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";
export default function Addnote(props) {
  const {  addNote } = useContext(noteContext);
     const [state,setState]=useState({title:"",description:"",tag:""});

     const handleOnClick=(e)=>{
        e.preventDefault();
           addNote(state.title,state.description,state.tag);
           setState({title:"",description:"",tag:""});
           props.showAlert("Note added successfully",'success');


     }

     const onchange=(e)=>{
              setState({...state,[e.target.name]:e.target.value})
     }
  return (
    <div>
      <div className="container">
        <h1> Add the Note</h1>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={state.title}
            />
        
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            description
            </label>
            <textarea
              rows={4}
              type="text"
              className="form-control"
              id="description"
              onChange={onchange}
              name="description"
              value={state.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              aria-describedby="emailHelp"
              onChange={onchange}
              value={state.tag}
            />
        
          </div>
        
          <button disabled={state.title.length<5 || state.description.length<5} type="submit" className="btn btn-primary" onClick={handleOnClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
