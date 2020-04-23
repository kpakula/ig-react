import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Login;
