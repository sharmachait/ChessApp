import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export type AppContextType = {
  children: React.ReactNode;
};

export type appContextType = {
  username?: string;
  id?: string;
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
  setId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const appContext = createContext<appContextType | undefined>(undefined);

const AppContext = (props: AppContextType) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  useEffect(() => {
    axios.get('auth/profile').then((res) => {
      if (res.status === 200) {
        setUsername(res.data.username);
        setId(res.data.id);
      }
    });
  }, []);

  return (
    <appContext.Provider value={{ username, id, setUsername, setId }}>
      {props.children}
    </appContext.Provider>
  );
};
export default AppContext;
