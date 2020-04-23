import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
          <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;
