import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";

export default function LoginSignup() {
  const { setUser } = useContext(userContext);
  let login = {
    username: "",
    pass: "",
  };
  let navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(login.user, login.pass);
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });
    if (res.ok) {
      console.log("LOGGED IN");
      // const username = React.createContext(login.username);
      setUser(login.username);
      navigate("/portal");
    } else {
      console.log("Unauthenticated");
    }
  };

  const handleField = (e) => {
    const { name, value } = e.target;
    login[name] = value;
  };
  return (
    <form onSubmit={handleLogin}>
      <input placeholder="User" name="username" onChange={handleField} />
      <input placeholder="Password" name="pass" onChange={handleField} />
      <button type="submit">Login</button>
    </form>
  );
}
