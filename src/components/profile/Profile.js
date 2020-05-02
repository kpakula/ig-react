import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../Auth";

import Navbar from "../global/Navbar";
import { makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  },
});

function Profile(props) {
  const classes = useStyles();


  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");

  const getProfileInformationRequest = (props) => {
    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8;",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    axios
      .get("http://localhost:8080/profile", config)
      .then((response) => {
        setUsername(response.data.username);
        setId(response.data.id);
        setEmail(response.data.email);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    auth.logout(() => {
      props.history.push("/");
    })
  } 


  useEffect(() => {
    console.log(auth.isAuthenticated())
    getProfileInformationRequest();
  }, []);

  // })
  return (
    <div className={classes.root}>
    <Navbar />
      <div>
      {username}
      {id}
      {email}
        <h1>Profile</h1>
      </div>

      <Container maxWidth="xl"> 
      <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }} />

      </Container>


      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
