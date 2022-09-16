import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    if (!localStorage.getItem("JWT_PAYLOAD")) {
      this.props.history.push("/");
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
