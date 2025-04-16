import { Pyramid } from "lucide-react";
import { Link } from "react-router-dom";

const MainNav = () => {
  
  const menus = [
    {
      path: "/",
      name: "หน้าแรก",
    },
    {
      path: "/booking-room",
      name: "ข้อมูลการจองห้อง",
    },
    {
      path: "/list-room",
      name: "ฐานข้อมูลห้องเรียน",
    },
    // {
    //   path: "/booking/room",
    //   name: "จองห้อง",
    // },
    // {
    //   path: "/about",
    //   name: "เพิ่มห้องเรียน",
    // },
    // {
    //   path: "/api",
    //   name: "ทดสอบ",
    // },   {
    //   path: "/list-all-room",
    //   name: "Query Room",
    // },
  ];
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-[#32507B] text-white w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 flex gap-2 items-center">
            <Pyramid size={35} />
            <p>ระบบจองห้องเรียน</p>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {menus.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Page content here */}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-[#32507B] text-white min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {menus.map((link, index) => (
            <li key={index}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainNav;
