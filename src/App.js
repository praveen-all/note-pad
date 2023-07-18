import "./App.css";
import About from "./Components/About";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { useState } from "react";
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
       setAlert({
        message,
        type
       })
       setTimeout(()=>{
         setAlert(null);
       },1500)
  }

  return (
    
    < >
      <NoteState>
        <Router>
          <NavBar />
          <Alert  alert={alert}/>
          <div className="container" >
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} ></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} ></Route>
            <Route exact path="/signUp" element={<SignUp  showAlert={showAlert}/>} ></Route>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
