import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Portal from "./components/Portal";
import LoginSignup from "./components/LoginSignup";

// import LoginSignup from "./components/LoginSignup";
// import Portal from "./components/Portal";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
