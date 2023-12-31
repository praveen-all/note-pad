import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Spinner from "./Spinner";

export default function SignUp(props) {
  const navigate = useNavigate();
  const {setUser,load,SetLoad}=useContext(noteContext);
  const [credentail, setCredential] = useState({
    email: "",
    name: "",
    password: "",
    ConfirmPassword: "",
  });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    SetLoad(true);
    const {name,email,password,ConfirmPassword}=credentail;
    if(password===ConfirmPassword){
      const res = await fetch(`https://notebackend-54yd.onrender.com/api/user/createUser`, {
        method: "POST",
        body: JSON.stringify({
         name,email,password
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let response = await res.json();
      
      SetLoad(false);
      if (response.status === "success") {
        props.showAlert('singUp successfully','success');
        localStorage.setItem("token", response.data.token);
        setUser(response.user);
        navigate("/");
      } else {
        props.showAlert(' something went to wrong','danger');
      }
    }else{
      props.showAlert('password missmatch☺️☺️','danger');
      SetLoad(false);
    }
   
  };

  const onChange = (e) => {
    setCredential({ ...credentail, [e.target.name]: e.target.value });
  };
  return (

    <div className="container" >
     { load&&<Spinner/>}

      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={credentail.email}
            onChange={onChange}
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            value={credentail.name}
            onChange={onChange}
            type="text"
            className="form-control"
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={credentail.password}
            onChange={onChange}
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={8}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ConfirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            value={credentail.ConfirmPassword}
            onChange={onChange}
            type="password"
            className="form-control"
            id="ConfirmPassword"
            name="ConfirmPassword"
            minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}
