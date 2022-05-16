import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Factors from "../components/Shortening/Factors/Factors";
import Resume from "../components/Shortening/Resume/Resume";
import { Counter } from "../features/counter/Counter";
import ProtectedRoutes from "./ProtectedRoutes";

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Factors />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/counter" element={<Counter />} />
          <Route path="/resume" element={<Resume />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
