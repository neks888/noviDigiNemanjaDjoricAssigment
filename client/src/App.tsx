import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {localStorage.getItem("id") && (
          <Route path="/register" element={<Register />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
