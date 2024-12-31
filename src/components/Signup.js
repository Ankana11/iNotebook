import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setCredential]= useState({name:"", email:"", password:"", cpassword:""});
  const {name, email, password} = credential
  let navigate  = useNavigate ();
    const handleSubmit= async (e)=>{
       e.preventDefault()
       const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save
localStorage.setItem('token', json.authtoken);
navigate("/login");
props.showalert("Account Created Successfully", "success")

      }else{
        props.showalert("Invalid Details", "danger")
      }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
      };
    
  return (
    <div className='container'>
        <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
  <div className="mb-3 mt-3">
    <label htmlFor="email" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  onChange={onChange} name='name' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 mt-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  onChange={onChange} name='email' aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange}  name='password' minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange={onChange}  name='cpassword' minLength={5} required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
