// import Bingo from "./Components/ButtonObj";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import "./App.css";
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import AddNote from "./pages/AddNote/AddNote";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/notepad" element={<Main />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/notepad/login" element={<Login />} />
          {/* <Route path="/add-note" element={<AddNote />} /> */}
          {/* <Redirect to="/" /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
