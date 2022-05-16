import { ThemeProvider } from "@emotion/react";
import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import theme from "./components/theme/theme";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}

export default App;
