import React from 'react';
import axios from 'axios';

const Header = () => {
  async function handleLogout(
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) {
    e.preventDefault();
    const response = await axios.post('/auth/logout');
    const redirectPath = '/login';

    if (response.status === 201) {
      console.log({ redirectPath });
      window.location.href = redirectPath;
    }
  }
  return (
    <div className={'flex h-20 flex-row-reverse mr-20'}>
      <button
        className={
          'bg-purple-200 font-semibold block mt-4 max-h-12 px-8 rounded-md p-2 text-[#0B132B]'
        }
        onClick={(e) => handleLogout(e)}
      >
        logout
      </button>
    </div>
  );
};
export default Header;
