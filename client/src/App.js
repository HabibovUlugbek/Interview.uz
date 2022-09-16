import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";
import store from "./store";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("_ID")) {
      axios
        .get(`/api/users/${localStorage.getItem("_ID")}`)
        .then((res) => {
          store.dispatch({
            user: res.data.user,
            type: "set_user",
          });
        })
        .catch((er) => {
          console.log(er);
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
