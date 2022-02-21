import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Portal from "./components/Portal";
import LoginSignup from "./components/LoginSignup";
import userContext from "./components/userContext";

// import LoginSignup from "./components/LoginSignup";
// import Portal from "./components/Portal";
function App() {
  const [user, setUser] = useState("");
  return (
    <BrowserRouter>
      <userContext.Provider value={{ user, setUser }}>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/portal" element={<Portal />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}
export default App;
