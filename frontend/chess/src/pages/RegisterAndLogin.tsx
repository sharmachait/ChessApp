import { useContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { appContext } from '../store/appContext.tsx';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterAndLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formMode, setFormMode] = useState('Login');

  const navigate = useNavigate();
  const context = useContext(appContext);

  useEffect(() => {
    if (context?.id) {
      navigate('home');
    }
  }, []);
  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) {
    e.preventDefault();
    if (formMode === 'Register') await register();
    else await login();
  }
  async function login() {
    const response = await axios.post('/auth/login', { username, password });
    const redirectPath = '/home';

    if (response.status === 201) {
      console.log(redirectPath);
      //set to some context
      context?.setUsername(response.data.username);
      context?.setId(response.data.id);

      navigate(redirectPath);
    }
  }

  async function register() {
    const response = await axios.post('/auth/register', { username, password });
    if (response.status === 201) {
      toast.info('Account Registered.', {
        position: 'top-left',
        autoClose: false,
      });
      setFormMode('Login');
    } else {
      toast.info('Registration failed, please retry.', {
        position: 'top-left',
        autoClose: false,
      });
      setUsername('');
      setPassword('');
    }
    // setFormMode('Login');
  }

  function changeMode(e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) {
    e.preventDefault();
    if (formMode === 'Register') setFormMode('Login');
    else setFormMode('Register');
  }

  return (
    <div className="h-svh flex gap-10 items-center justify-center ">
      <img src="../../board.png" className="max-w-72 md:max-w-96 xl:max-w-xl" />
      <div className={'form flex flex-col items-center justify-center mt-20'}>
        <div className="text-purple-200 font-bold text-2xl p-2">Play Chess</div>
        <div className="text-purple-200 font-bold text-lg p-2">{formMode}</div>
        <form className="w-80 flex flex-col gap-2 mb-40">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="Email"
            placeholder="Email"
            className="block w-full font-semibold rounded-md p-2 border"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="block font-semibold w-full rounded-md p-2 border"
          />
          <button
            className="bg-purple-200 font-semibold block w-full rounded-md p-2 text-[#0B132B]"
            onClick={handleSubmit}
          >
            {formMode}
          </button>
          <div className="text-center mt-2">
            {formMode === 'Register' && (
              <div className="flex gap-2 justify-center text-purple-200 font-bold p-2">
                <div>Already a member ?</div>
                <button onClick={changeMode}>Login Here</button>
              </div>
            )}
            {formMode === 'Login' && (
              <div className="flex gap-2 justify-center text-purple-200 font-bold p-2">
                <div>Not a member yet ?</div>
                <button className="" onClick={changeMode}>
                  Register Here
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAndLogin;
