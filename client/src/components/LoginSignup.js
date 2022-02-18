import React from "react";

export default function LoginSignup() {
  let login = {
    username: "",
    pass: "",
  };

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
