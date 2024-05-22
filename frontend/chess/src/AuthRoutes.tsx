import { useContext } from 'react';
// import Home from './pages/Home.jsx';
import { UserContext } from './store/UserContext.jsx';
import { Navigate, useLocation } from 'react-router-dom';

type AuthRoutesProps = {
  children: React.ReactNode;
};

const AuthRoutes = (props: AuthRoutesProps) => {
  const location = useLocation();
  const userContext = useContext(UserContext);

  console.log({ idAtAuthRoutes: userContext?.id });

  if (!userContext?.id) {
    return <Navigate to="/" state={{ path: location.pathname }}></Navigate>;
  }
  return <div>{props.children}</div>;
};

export default AuthRoutes;
