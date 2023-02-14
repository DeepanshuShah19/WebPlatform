import React, { useState } from "react";
import WebhookIcon from "@mui/icons-material/Webhook";
import { Button } from "@mui/material";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      console.log("sending request...");
      let resp = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });

      if (resp.status === 404) {
        alert("Invalid User Email or Password");
      } else {
        alert("User Logged in successfully");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="app__login">
      <div className="login__container">
        <div className="container_left">
          <WebhookIcon />
        </div>
        <div className="container_right">
          <form className="form" onSubmit={handleLogin} action="#">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="login__button" variant="contained">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
