import { Outlet } from "react-router-dom";

import MainNav from "../components/navbar/MainNav";

const Layout = () => {
  return (
    <main className="bg-base-200 min-h-screen">
      <header>
        <nav>
          <MainNav />
        </nav>
      </header>
      <Outlet />
    </main>
  );
};

export default Layout;
