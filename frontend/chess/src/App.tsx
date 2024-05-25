import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes.tsx';
import axios from 'axios';
import Landing from './pages/Landing.tsx';
import AccountVerification from './pages/AccountVerification.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegisterAndLogin from './pages/RegisterAndLogin.tsx';
import AppContext from './store/appContext.tsx';
import Layout from './pages/Layout.tsx';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="h-screen">
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoutes>
                  <Landing />
                </AuthRoutes>
              }
            />
            <Route path="/register" element={<RegisterAndLogin />} />
            <Route path="/login" element={<RegisterAndLogin />} />
            <Route path="/home" element={<Layout />}>
              <Route
                index
                element={
                  <AuthRoutes>
                    <Landing />
                  </AuthRoutes>
                }
              />
            </Route>
            <Route path="/verify" element={<AccountVerification />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AppContext>
    </div>
  );
}

export default App;
