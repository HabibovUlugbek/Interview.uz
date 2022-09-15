import React, { useState } from "react";

export default function Signup({ signUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div className="sign-in-wrapper">
      <div className="form">
        <div className="input-wrapper">
          <div>Email Address</div>
          <input
            className="input"
            type="text"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <div>Password</div>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <div>First Name</div>
          <input
            className="input"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <div>Last Name</div>
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div
          className="btn"
          onClick={() => signUp({ email, firstName, lastName, password })}
        >
          Sign Up
        </div>
      </div>
    </div>
  );
}
