import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import auth from "./Auth";
import {
  Typography,
  Grid,
  Paper,
  makeStyles,
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Snackbar,
  InputAdornment,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const displayError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/authenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.jwtToken);
        auth.login(() => {
          props.history.push("/profile");
        });
      })
      .catch((error) => {
        console.log(error);
        clearPassword();
        displayError();
      });
  };

  const clearPassword = () => {
    setPassword("");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              InputProps={{
            startAdornment: (
            <InputAdornment position="start" >
              <AccountCircle onClick={() => console.log("circle")} />
            </InputAdornment>
          ),
        }}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}

              InputProps={{
            startAdornment: (
            <InputAdornment position="start">
              <VisibilityOffIcon />
            </InputAdornment>
          ),
        }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
            <DoubleArrowIcon />

            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>


          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Wrong data!
            </Alert>
          </Snackbar>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}

export default Login;
