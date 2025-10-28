import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Screens/Home/Home";
import { AuthProvider } from "./auth/AuthContext"; // Auth context
import Login from "./Screens/Login/Login"; // Login component
import AIAgent from "./Screens/AIAgent/AIAgent";
import AITools from "./Screens/AITools/AITools";
import AITutorials from "./Screens/AITutorial";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AIAgent" element={<AIAgent />} />
          <Route path="/AITools" element={<AITools />} />
          <Route path="/AITutorials" element={<AITutorials />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
