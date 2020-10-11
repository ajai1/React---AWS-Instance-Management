import React, { useState, useEffect } from "react";
import Login from "./LoginAndRegister/Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005A3C",
    },
  },
});

function App() {
  const [isAuthorized, setIsAuthorized] = useState("false");

  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      setIsAuthorized(localStorage.getItem("authorization"));
    } else {
      setIsAuthorized("false");
    }
    console.log(isAuthorized);
  }, [isAuthorized]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route
              exact
              path="/login"
              component={() => (
                <Login
                  header="Sign in"
                  submit="Login"
                  footerLink="Create an account"
                  link="/register"
                />
              )}
            />
            <Route
              exact
              path="/register"
              component={() => (
                <Login
                  header="Sign up"
                  submit="Create an account"
                  footerLink="Have an account already? Login here"
                  link="/login"
                />
              )}
            />
            {isAuthorized !== "false" ? (
              <Route exact path="/dashboard" component={() => <Dashboard />} />
            ) : (
              <Route
                path="/"
                component={() => (
                  <Login
                    header="Sign in"
                    submit="Login"
                    footerLink="Create an account"
                    link="/register"
                  />
                )}
              />
            )}

            <Route
              path="/"
              component={() => (
                <Login
                  header="Sign in"
                  submit="Login"
                  footerLink="Create an account"
                  link="/register"
                />
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
