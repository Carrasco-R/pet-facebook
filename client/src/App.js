import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Portal from "./components/Portal";
import Login from "./components/Login";
import Signup from "./components/Signup";
import userContext from "./components/userContext";

function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}
export default App;
