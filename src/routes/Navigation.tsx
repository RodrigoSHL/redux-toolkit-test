import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountBalance from "../components/AccountBalance/AccountBalance";
import Factors from "../components/Shortening/Factors/Factors";
import Resume from "../components/Shortening/Resume/Resume";
import Maintainers from "../components/Maintainers/Maintainers";

import { Counter } from "../features/counter/Counter";
import ProtectedRoutes from "./ProtectedRoutes";
import Obsolescence from "../components/Obsolescence/Obsolescence";
import RoleMaintainer from "../components/RoleMaintainer/RoleMaintainer";
import UserProfile from "../components/UserProfile/UserProfile";
import CustomerReturn from "../components/CustomerReturn/CustomerReturn";

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
          <Route path="/obsolescence" element={<Obsolescence />} />
          <Route path="/user" element={<RoleMaintainer />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/customerReturn" element={<CustomerReturn />} />

        </Route>
      </Routes>
    </>
  );
};

export default Navigation;
