import React from "react";
import { Link } from "react-router-dom";
import { Pyramid } from "lucide-react";

const SidebarAdmin = () => {
  const links = [
    { path: "", name: "menu 1", icon: <Pyramid /> },
    { path: "", name: "menu 1", icon: <Pyramid /> },
    { path: "", name: "menu 1", icon: <Pyramid /> },
    { path: "", name: "menu 1", icon: <Pyramid /> },
    { path: "", name: "menu 1", icon: <Pyramid /> },
    { path: "", name: "menu 1", icon: <Pyramid /> },
  ];
  return (
    <div className=" w-64 border-r">
      <div className=" text-xl h-16 mx-auto flex items-center justify-center">
        Admin
      </div>
      <nav className=" flex flex-col gap-2 pr-1  ">
        {links.map((link, index) => (
          <Link
            className="p-2 rounded-none flex gap-2 hover:bg-base-300 duration-300"
            to={link.path}
            key={index}
          >
            {link.icon}
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SidebarAdmin;
