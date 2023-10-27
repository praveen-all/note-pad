import React, { useState ,useContext} from "react";
import { useNavigate  } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Spinner from "./Spinner";
export default function Login(props) {
  const navigate = useNavigate();
  const {load,SetLoad}=useContext(noteContext);
  
  const [credentail, setCredential] = useState({ email: "", password: "" });
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    SetLoad(true)
    try {
      const res = await fetch(`https://notebackend-54yd.onrender.com/api/user/login/`, {
      method: "POST",
      body: JSON.stringify({
        email: credentail.email,
        password: credentail.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await res.json();
    SetLoad(false);
    if (response.status === "success") {
      props.showAlert('login successfully','success');
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } else {
      props.showAlert(response.data.message,'danger');
    }
    } catch (error) {
      props.showAlert('Invalide Credential','danger');
    }
  };

  const onChange = (e) => {
    setCredential({ ...credentail, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {load&&<Spinner/>}
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentail.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            value={credentail.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
