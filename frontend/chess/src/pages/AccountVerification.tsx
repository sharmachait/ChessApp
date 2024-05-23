// import React from 'react';
import { useContext } from 'react';
import { appContext } from '../store/appContext.tsx';

const AccountVerification = () => {
  const userContext = useContext(appContext);
  console.log({ id: userContext?.id });
  return <div>AccountVerification</div>;
};
export default AccountVerification;
