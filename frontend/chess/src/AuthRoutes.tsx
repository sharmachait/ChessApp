import { useContext } from 'react';
// import Home from './pages/Home.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { appContext } from './store/appContext.tsx';

type AuthRoutesProps = {
  children: React.ReactNode;
};

const AuthRoutes = (props: AuthRoutesProps) => {
  const location = useLocation();
  const context = useContext(appContext);

  console.log({ idAtAuthRoutes: context?.id });

  if (context?.id == undefined) {
    return <Navigate to="/" state={{ path: location.pathname }}></Navigate>;
  }
  return <div>{props.children}</div>;
};

export default AuthRoutes;
