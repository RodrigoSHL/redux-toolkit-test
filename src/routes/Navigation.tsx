import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountBalance from "../components/AccountBalance/AccountBalance";
import Factors from "../components/Shortening/Factors/Factors";
import Resume from "../components/Shortening/Resume/Resume";
import { Counter } from "../features/counter/Counter";
import Drawer from "./Drawer";
import ProtectedRoutes from "./ProtectedRoutes";
import styles from "./Drawer.module.css";
import { Box } from "@mui/material";
import Home from "../components/Home/Home";

const Navigation = () => {
  return (
    <Box>
      <BrowserRouter>
        <Drawer />
        <Routes>
          <Route path="/" element={<Factors />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/counter" element={<Counter />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/balance" element={<AccountBalance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default Navigation;
