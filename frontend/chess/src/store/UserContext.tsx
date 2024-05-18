import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export interface UserContextType {
  contextUsername: string;
  id: string;
  setContextUsername: (username: string) => void;
  setId: (id: string) => void;
}

// Create the context with the initial value as undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

type UserContextProviderProps = {
  children: React.ReactNode;
};

export default function UserContextProvider(props: UserContextProviderProps) {
  const [contextUsername, setContextUsername] = useState('');
  const [id, setId] = useState('');
  useEffect(() => {
    axios.get('/auth/profile').then((response) => {
      setId(response.data.id);
      setContextUsername(response.data.username);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ contextUsername, id, setContextUsername, setId }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
