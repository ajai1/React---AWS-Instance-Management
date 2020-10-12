import React, { useState, useEffect } from "react";
//Dependent Router Dom --------------------------------------------------------
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Child Component ------------------------------------------------------------
import Login from "./LoginAndRegister/Login";
import Dashboard from "./Dashboard/Dashboard";
// Material-UI Theme ----------------------------------------------------------
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#005A3C",
    },
  },
});

// App Component --------------------------------------------------------------
function App() {
  const [isAuthorized, setIsAuthorized] = useState("false");

  useEffect(() => {
    isLoggedIn();
    console.log(isAuthorized);
  }, [isAuthorized]);

  const isLoggedIn = () => {
    if (localStorage.getItem("authorization")) {
      setIsAuthorized(localStorage.getItem("authorization"));
    } else {
      setIsAuthorized("false");
    }
  };

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
                  isLoggedIn={isLoggedIn}
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
                  isLoggedIn={isLoggedIn}
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
                    isLoggedIn={isLoggedIn}
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
                  isLoggedIn={isLoggedIn}
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
