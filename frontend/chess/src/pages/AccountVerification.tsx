// import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../store/UserContext.tsx';

const AccountVerification = () => {
  const userContext = useContext(UserContext);
  console.log({ id: userContext?.id });
  return <div>AccountVerification</div>;
};
export default AccountVerification;
