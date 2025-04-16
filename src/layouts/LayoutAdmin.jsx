import { Outlet } from "react-router-dom";
import AdminNav from "../components/navbar/AdminNav";
import SidebarAdmin from "../components/navbar/SidebarAdmin";

const LayoutAdmin = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <AdminNav />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
