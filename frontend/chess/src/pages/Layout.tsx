import { Outlet } from 'react-router-dom';
import Header from '../components/Header.tsx';

const Layout = () => {
  return (
    <div className={'flex flex-col'}>
      <Header></Header>
      <Outlet></Outlet>
    </div>
  );
};
export default Layout;
