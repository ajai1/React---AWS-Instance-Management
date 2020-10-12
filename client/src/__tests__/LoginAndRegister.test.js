import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../components/LoginAndRegister/Login";
import jest from "jest-mock";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* 
    To Find if the Login screen shows right component
*/
it("Renders the Login Link", () => {
  const { getByTestId } = render(
    <Router>
      <Login
        header="Sign in"
        submit="Login"
        footerLink="Create an account"
        link="/register"
        isLoggedIn="false"
      />
    </Router>
  );
  expect(getByTestId("submitBtn")).toHaveTextContent(/^Login$/);
});

/* 
    To Find if the Register screen shows right component
*/
it("Renders the Register Link", () => {
  const { getByTestId } = render(
    <Router>
      <Login
        header="Sign in"
        submit="Create an account"
        footerLink="Have an account already? Login here"
        link="/login"
        isLoggedIn="false"
      />
    </Router>
  );
  expect(getByTestId("submitBtn")).toHaveTextContent(/^Create an account$/);
});
