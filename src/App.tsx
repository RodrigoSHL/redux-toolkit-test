import { ThemeProvider } from "@emotion/react";
import React from "react";
import Home from "./components/Home/Home";
import theme from "./components/theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Home/>
      </ThemeProvider>
    </>
  );
}

export default App;
