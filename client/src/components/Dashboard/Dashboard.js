import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("JWT_PAYLOAD")) {
      navigate("/");
    }
  });

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main">
        <div className="top">
          <div className="left">
            <div className="header">Statistics</div>
          </div>
          <div className="right">
            <div className="header">My Quizzes</div>
          </div>
        </div>

        <div className="bottom"></div>
      </div>
    </div>
  );
}
