import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "../components/Home/Home";
import Factors from "../components/Shortening/Factors/Factor";
import { Counter } from "../features/counter/Counter";
import ProtectedRoutes from "./ProtectedRoutes";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Factors />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Counter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
