import {useContext} from 'react';
import {useLocation} from 'react-router';
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = true;
  return isAuth ? <Outlet /> : <Navigate to="/" replace state={{from: location}} />;
};

export default ProtectedRoutes;
