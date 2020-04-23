import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
    <h1>Home</h1>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Home;
