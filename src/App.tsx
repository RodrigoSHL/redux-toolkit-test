import { ThemeProvider } from "@emotion/react";
import React from "react";
import Home from "./components/Home/Home";
import theme from "./components/theme/theme";
import Navigation from "./routes/Navigation";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation/>
      </ThemeProvider>
    </>
  );
}

export default App;
