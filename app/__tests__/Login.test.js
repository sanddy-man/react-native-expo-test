import React from "react";
import Login from "../src/screens/login/Login";

import renderer from "react-test-renderer";

it("renders correctly", () => {
  const rendered = renderer.create(<Login />).toJSON();
  expect(rendered).toMatchSnapshot();
});
