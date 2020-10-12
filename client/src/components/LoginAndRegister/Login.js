import React, { useState } from "react";
// Dependent Component --------------------------------------------------------------
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
// Material UI  ---------------------------------------------------------------------
import {
  FormControl,
  FormHelperText,
  TextField,
  makeStyles,
  Button,
  Typography,
} from "@material-ui/core";
// CSS ------------------------------------------------------------------------------
import "./Login.css";

// Styles ---------------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  helperText: {
    margin: "0",
  },
  textField: {
    marginBottom: "10px !important",
  },
}));

// Login Component ------------------------------------------------------------------
const Login = ({ header, submit, footerLink, link, isLoggedIn }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSubmit = async () => {
    let url = "/api/login";
    if (submit !== "Login") url = "/api/register";
    const res = await axios.post(url, { email, password });
    if (res.headers.authorization) {
      localStorage.setItem("authorization", res.headers.authorization);
    }
    isLoggedIn();
    history.push({
      pathname: "/dashboard",
    });
  };

  return (
    <div className="loginPage">
      <div className="login__form__container">
        <FormControl fullWidth variant="outlined">
          <Typography variant="h5" component="h5">
            {header}
          </Typography>
          <FormHelperText className={classes.helperText}>
            <strong>EMAIL</strong>
          </FormHelperText>
          <TextField
            className={classes.textField}
            id="outlined-multiline-flexible"
            rowsMax={4}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText className={classes.helperText}>
            <strong>PASSWORD</strong>
          </FormHelperText>
          <TextField
            className={classes.textField}
            id="outlined-multiline-flexible"
            rowsMax={4}
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px" }}
            onClick={onSubmit}
            data-testid="submitBtn"
          >
            {submit}
          </Button>
          <Link style={{ textDecoration: "none", color: "#005A3C" }} to={link}>
            {footerLink}
          </Link>
        </FormControl>
      </div>
    </div>
  );
};

export default Login;
