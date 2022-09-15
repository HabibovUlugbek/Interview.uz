import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
