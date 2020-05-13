import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  makeStyles,
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
  Snackbar,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import EmailIcon from "@material-ui/icons/Email";
import CheckIcon from "@material-ui/icons/Check";

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

function Register(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(undefined);
  const [usernameErrorInfo, setUsernameErrorInfo] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(undefined);
  const [passwordErrorInfo, setPasswordErrorInfo] = useState("");

  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(undefined);
  const [repeatPasswordErrorInfo, setRepeatPasswordErrorInfo] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(undefined);
  const [emailErrorInfo, setEmailErrorInfo] = useState("");

  const successRedirect = () => {
    props.history.push("/home");
  };
  
  const displayError = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const clear = () => {
    setUsername("");
    setPassword("");
    setRepeatPassword("");
    setEmail("");
  };

  const validateUser = () => {
    validateUsername();
    validateEmail();
    validatePassword();
    validateSamePassword();

    console.log(usernameError, emailError, passwordError, repeatPasswordError);
    if (usernameError || emailError || passwordError || repeatPasswordError) {
      return false;
    }


    return true;
  };

  const validateUsername = () => {
    if (username.length <= 3) {
      setUsernameError(true);
      setUsernameErrorInfo("Username is too short");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (! reg.test(email)) {
      setEmailError(true);
      setEmailErrorInfo("Email is not valid");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length <= 8) {
      setPasswordError(true);
      setPasswordErrorInfo("Password is too short")
      return false;
    }
    return true;
  };

  const validateSamePassword = () => {

    if (password === '') {
      setRepeatPasswordError(true);
      setRepeatPasswordErrorInfo("Password can not be empty");
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError(true);
      setRepeatPasswordErrorInfo("Passwords are not the same");
      return false;
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateUser()) {
      axios
        .post("http://localhost:8080/register", {
          username: username,
          password: password,
          email: email,
        })
        .then((response) => {
          clear();
          successRedirect();
        })
        .catch((error) => {
          console.warn(error);
          displayError();
        });
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up
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
              helperText={usernameErrorInfo}
              error={usernameError}
              value={username}
              onChange={(e) => {
                if (usernameError === true) {
                  setUsernameError(false);
                  setUsernameErrorInfo("");
                }

                setUsername(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
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
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              error={emailError}
              helperText={emailErrorInfo}
              onChange={(e) => {
                if (emailError === true) {
                  setEmailError(false);
                  setEmailErrorInfo("");
                }
                setEmail(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
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
              error={passwordError}
              helperText={passwordErrorInfo}
              value={password}
              onChange={(e) => {
                if (passwordError === true) {
                  setPasswordError(false);
                  setPasswordErrorInfo("");
                }
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

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repeat password"
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              error={repeatPasswordError}
              helperText={repeatPasswordErrorInfo}
              onChange={(e) => {
                if (repeatPasswordError === true) {
                  setRepeatPasswordError(false);
                  setRepeatPasswordErrorInfo("");
                }
                setRepeatPassword(e.target.value);
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
              <CheckIcon />
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2" to="/login">
                  {"You have an account? Sign in!"}
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
    </Grid>
  );
}

export default Register;
