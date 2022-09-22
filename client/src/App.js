import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import axios from "axios";
import store from "./store";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import MyQuizzes from "./components/MyQuizzes/MyQuizzes";
import CommunityQuizzes from "./components/CommunityQuizzes/CommunityQuizzes";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import TakeQuiz from "./components/TakeQuiz/TakeQuiz";

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
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/my-quizzes" element={<MyQuizzes />} />
          <Route path="/community-quizzes" element={<CommunityQuizzes />} />
          <Route path="/view-quiz" element={<ViewQuiz />}>
            <Route index path="*" component={<ViewQuiz />} />
            <Route path=":id" component={<ViewQuiz />} />
          </Route>
          <Route path="/take-quiz" element={<TakeQuiz />}>
            <Route index path="*" component={<TakeQuiz />} />
            <Route path=":id" component={<TakeQuiz />} />
          </Route>
          {/* <Route path="/view-results" component={ViewResults} />
          <Route path="/account" component={Profile} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    );
  }
}

export default App;
