import { ThemeProvider } from "@emotion/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import theme from "./components/theme/theme";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
