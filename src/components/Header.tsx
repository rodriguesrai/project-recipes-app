import { Outlet } from 'react-router-dom';
import SearchBar from './SearchBar';

function Header() {
  return (
    <>
      <header>
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default Header;
