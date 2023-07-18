import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  // const host='http://127.0.0.1:5000'

  // fetch the all the notes 
  const fetchallNotes=async()=>{
    try{const res=await fetch('http://127.0.0.1:5000/api/notes',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })
    const response=await res.json();
    setNotes(response.data.notes);}
    catch(err){
      console.log(err);
    }
  }

  // add note
  const addNote = async(title, description, tag) => {
  
    const res=await fetch('http://127.0.0.1:5000/api/notes/createnote',{
      method:'POST',
      body:JSON.stringify({title,description,tag}),
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })
   const response= await  res.json();

    setNotes(notes.concat(response.note));
  };

  // delete note
  const deleteNote = async(id) => {
   await fetch(`http://127.0.0.1:5000/api/notes/deleteNote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })

    setNotes(notes.filter(el=>el._id!==id));
   
  };

  // update note

  const editNote = async (title,description,tag,id) => {
    //  how to call using fetch methode
  

    const res=await fetch(`http://127.0.0.1:5000/api/notes/updateNote/${id}`,{
      method:'PATCH',
      
      body:JSON.stringify({title,description,tag}),
      
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })

   const response=await res.json();
    let newNotes=JSON.parse(JSON.stringify(notes));
   for (let index = 0; index < notes.length; index++) {
    let element = newNotes[index];
    
     if(element._id===id){
      newNotes[index]=response.note;
      break;
     }
   }
   setNotes(newNotes);
  };
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchallNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
