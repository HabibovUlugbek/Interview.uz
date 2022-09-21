import React, { useState } from "react";
import axios from "axios";
import SignIn from "./Signin";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Toast from "../Toast/Toast";
import "./Auth.css";
import store from "../../store";

export default function Auth() {
  let navigate = useNavigate();
  const [tab, setTab] = useState("signin");
  const [showToast, setShowToast] = useState(false);

  const signIn = (email, password) => {
    axios
      .post("/api/users/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          store.dispatch({
            type: "login",
            _id: res.data.user._id,
            user: res.data.user,
            token: res.data.token,
          });
          navigate("/dashboard");
        } else {
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        }
      })
      .catch((er) => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      });
  };

  const signUp = ({ firstName, lastName, email, password }) => {
    axios
      .post("/api/users/register", { firstName, lastName, email, password })
      .then((res) => {
        if (res.data.success) {
          setTab("signin");
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };

  const changeTab = () => {
    tab === "signup" ? setTab("signin") : setTab("signup");
  };

  let page =
    tab === "signin" ? <SignIn signIn={signIn} /> : <Signup signUp={signUp} />;

  return (
    <div className="auth-wrapper">
      <Toast
        model={showToast}
        message="Incorrect login"
        backgroundColor="#FF4539"
      />
      <div className="left">
        <img alt="logo" src="https://freesvg.org/img/chemist.png" />
      </div>

      <div className="right">
        <div className="header">Interview.uz</div>
        <div className="sub-header">Welcome to Interview.uz</div>
        {page}
        <div className="new" onClick={changeTab}>
          {tab === "signin"
            ? "New to Interview.uz? Sign up here"
            : "Already have an account with us? Sign in"}
        </div>
      </div>
    </div>
  );
}
