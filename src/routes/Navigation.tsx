import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountBalance from "../components/AccountBalance/AccountBalance";
import Factors from "../components/Shortening/Factors/Factors";
import Resume from "../components/Shortening/Resume/Resume";
import Maintainers from "../components/Maintainers/Maintainers";

import { Counter } from "../features/counter/Counter";
import ProtectedRoutes from "./ProtectedRoutes";

const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Factors />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/counter" element={<Counter />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/balance" element={<AccountBalance />} />
          <Route path="/maintainers" element={<Maintainers />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
