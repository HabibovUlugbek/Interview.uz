import React, { useState } from "react";

export default function Auth() {
  const [tab, setTab] = useState("signin");
  return (
    <div className="auth-wrapper">
      <div className="left"></div>
      <div className="right">
        <div className="header">Interview.uz</div>
        <div className="sub -header"> Welcome to Interview.uz</div>
      </div>
    </div>
  );
}
