import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();


    axios
      .post("http://localhost:8080/authenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwtToken);

        props.history.push("/profile")
      })
      .catch((error) => {
        clearPassword();
      })
    }

  const clearPassword = () => {
      setPassword("");
  }


  return (
    <div>
      <h1>Login</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
