import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@material-ui/core";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

    const successRedirect = () => {
        props.history.push("/home")
    }

  const clear = () => {
    setUsername("");
    setPassword("");
    setEmail("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);

    axios
      .post("http://localhost:8080/register", {
        username: username,
        password: password,
        email: email,
      })
      .then((response) => {
        console.log(response);
        clear();
        successRedirect();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>      
    <Typography variant="h3"  gutterBottom>
    Register
  </Typography>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
