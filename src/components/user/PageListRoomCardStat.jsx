import { Building } from "lucide-react";

const PageListRoomCardStat = ({ countbuilding, countRoom }) => {
  return (
    <div className="grid grid-cols-5 gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
      <div className="p-4 shadow rounded bg-white flex items-center justify-between gap-4 cursor-pointer max-sm:w-full">
        <div>
          <div>ข้อมูลห้อง</div>
          <div> {countRoom ? <>{countRoom}</> : "..."} ห้อง</div>
        </div>
        <Building />
      </div>
      <div className="p-4 shadow rounded bg-white flex items-center justify-between gap-4 cursor-pointer max-sm:w-full">
        <div>
          <div>ข้อมูลอาคาร</div>
          <div> {countbuilding ? <>{countbuilding}</> : "..."} อาคาร</div>
        </div>
        <Building />
      </div>
    </div>
  );
};

export default PageListRoomCardStat;
