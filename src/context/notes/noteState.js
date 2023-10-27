import {  useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {

  // fetch the all the notes 
  const fetchallNotes=async()=>{
   SetLoad(true);
    
    try{const res=await fetch('https://notebackend-54yd.onrender.com/api/notes',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      },
    })
    const response=await res.json();
    SetLoad(false);

    setUser(response.user);
    setNotes(response.data.notes);}
    catch(err){
      
    }
    SetLoad(false);
  }

  // add note
  const addNote = async(title, description, tag) => {
  SetLoad(true)
    const res=await fetch('https://notebackend-54yd.onrender.com/api/notes/createnote',{
      method:'POST',
      body:JSON.stringify({title,description,tag}),
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })
   const response= await  res.json();
    SetLoad(false);
    setNotes(notes.concat(response.note));
  };

  // delete note
  const deleteNote = async(id) => {
    SetLoad(true);
   await fetch(`https://notebackend-54yd.onrender.com/api/notes/deleteNote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })
   SetLoad(false);
    setNotes(notes.filter(el=>el._id!==id));
   
  };

  // update note
  
  const editNote = async (title,description,tag,id) => {
    //  how to call using fetch methode
    SetLoad(true);
  

    const res=await fetch(`https://notebackend-54yd.onrender.com/api/notes/updateNote/${id}`,{
      method:'PATCH',
      
      body:JSON.stringify({title,description,tag}),
      
      headers:{
        'Content-Type':'application/json',
         'authorization':'Bearer '.concat(localStorage.getItem('token')),
      }
    })

   const response=await res.json();
   SetLoad(false);

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
  const [user,setUser]=useState(null);
  const [load,SetLoad]=useState(false);

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,fetchallNotes,user,setUser,load,SetLoad}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
