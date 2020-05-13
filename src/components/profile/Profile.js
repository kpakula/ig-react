import React, { useEffect, useState } from "react";
import axios from "axios";
import auth from "../Auth";

import Navbar from "../global/Navbar";
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Paper,
  ThemeProvider,
  Avatar,
} from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  mainContainer: {
    paddingTop: theme.spacing(2),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  largeAvatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

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
    });
  };

  useEffect(() => {
    console.log(auth.isAuthenticated());
    getProfileInformationRequest();
  }, []);

  // })
  return (
    <div className={classes.root}>
      <Navbar />
      <Container maxWidth="xl" className={classes.mainContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Avatar
                  alt="Avatar"
                  className={[classes.largeAvatar, classes.purple].join(" ")}
                ></Avatar>
              </Grid>
              <Grid item xs={3}>
              <h1>Profile</h1>
              </Grid>
            </Grid>


          </Grid>
          <Grid item xs={12} sm={6}>
            {id}
          </Grid>
          <Grid item xs={12} sm={6}>
            {username}
          </Grid>
          <Grid item xs={12} sm={6}>
            {email}
          </Grid>
        </Grid>
      </Container>

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Profile;
