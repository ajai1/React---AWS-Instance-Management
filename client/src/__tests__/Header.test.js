import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../components/Dashboard/Header/Header";

afterEach(cleanup);

/*
    To check if the Header is not changed, and a layout is maintained
    To Prevent the changes made to the Header Component
*/
it("renders", () => {
  const { asFragment } = render(<Header />);
  expect(asFragment()).toMatchSnapshot();
});

it("Logout", () => {
  const { getByTestId, getByText } = render(<Header />);
  expect(getByTestId("logout")).toHaveTextContent("Logout");
});
