import React, { useRef } from "react";
import { useUserContext} from "../context/userContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const emailRef = useRef();
  const nameRef = useRef();
  const psdRef = useRef();
  const majorRef = useRef();
  const { registerUser } = useUserContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = psdRef.current.value;
    const major = majorRef.current.value;
    if (email && password && name) registerUser(email, password, name, major); 
    navigate('/');
  };

  return (
    <div className="form ">
      <h2> New User</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Name" type="name" ref={nameRef} />
        <input placeholder="Major" type="major" ref={majorRef} />
        <input placeholder="Password" type="password" ref={psdRef} />
        <button type="submit" >Register</button>
      </form>
    </div>
  );
};

export default SignUp;
