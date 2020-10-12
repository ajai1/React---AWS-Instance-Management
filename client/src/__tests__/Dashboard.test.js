import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard/Dashboard";

it("Match the Layout", () => {
  const { asFragment } = render(<Dashboard />);
  expect(asFragment()).toMatchSnapshot();
});
