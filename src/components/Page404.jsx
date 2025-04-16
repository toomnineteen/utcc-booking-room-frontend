import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="mt-40 flex items-center justify-center flex-col gap-4">
      <div>
      <p className=" text-xl">ไม่พบหน้านี้</p>
      </div>
      <div>
        <Link to={"/"} className="btn btn-outline btn-primary btn-sm">กลับหน้าแรก</Link>
      </div>
    </div>
  );
};

export default Page404;
