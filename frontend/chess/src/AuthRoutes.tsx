import { useContext } from 'react';
import RegisterAndLoginPage from './pages/RegisterAndLogin.tsx';
// import Home from './pages/Home.jsx';
import { UserContext } from './store/UserContext.jsx';
import { useNavigate } from 'react-router-dom';

const AuthRoutes = () => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  if (userContext?.contextUsername) {
    navigate('/home');
  }
  return <RegisterAndLoginPage></RegisterAndLoginPage>;
};
export default AuthRoutes;
