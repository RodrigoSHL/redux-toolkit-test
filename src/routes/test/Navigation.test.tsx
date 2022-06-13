import React from "react";
import { render } from "@testing-library/react";
import Navigation from "../Navigation";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </Provider>
  );
});
