/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { readAllRoom, readCountBuilding, readCountRoom } from "../api/readapi";
import PageListRoomCardStat from "../components/user/PageListRoomCardStat";
import CardLoading from "../components/ui/CardLoading";
import { Link } from "react-router-dom";

const PageListRoom = () => {
  const [loading, setLoading] = useState(true);

  async function fetchBuilding() {
    try {
      setLoading(true);
      // fetch อาคาร
      const countBuilding = await readCountBuilding();
      setCountBuilding(countBuilding?.data?.length);
      setNameBuilding(countBuilding?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRoom() {
    try {
      setLoading(true);
      // fetch ห้อง
      const countRoom = await readCountRoom();
      setCountRoom(countRoom?.data?.totalRoom);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function readData() {
    try {
      setLoading(true);
      const response = await readAllRoom(
        room,
        building,
        seatMin,
        seatMax,
        limit,
        page,
        remark
      );
      setDataRoom(response?.data?.data);
      setTotal(response?.data?.totalCount_keyWord);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // console.log("Fetch Data 1...");
    fetchRoom();
    fetchBuilding();
  }, []);

  const [dataRoom, setDataRoom] = useState([]);
  const [nameBuilding, setNameBuilding] = useState([]);
  const [countbuilding, setCountBuilding] = useState(null);
  const [countRoom, setCountRoom] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [total, setTotal] = useState(0);
  const [room, setRoom] = useState("");
  const [building, setBuilding] = useState("");
  const [seatMin, setSeatMin] = useState("");
  const [seatMax, setSeatMax] = useState("");
  const [remark, setRemark] = useState("");

  const resetSearch = () => {
    setPage(1);
    setLimit(25);
    setRoom("");
    setBuilding("");
    setSeatMax("");
    setSeatMin("");
    setRemark("");
  };

  const handleChangeRoom = (e) => {
    setRoom(e.target.value);
    setPage(1);
  };

  const handleChangeSeatMin = (e) => {
    setSeatMin(e.target.value);
    setPage(1);
  };

  const handleChangeSeatMax = (e) => {
    setSeatMax(e.target.value);
    setPage(1);
  };

  const handleChangeRemark = (e) => {
    setRemark(e.target.value);
    setPage(1);
  };

  const handleBuilding = (e) => {
    setBuilding(e.target.value);
    setPage(1);
  };

  const handleNext = () => {
    if (page * limit < total) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(total / limit);
    setPage(lastPage);
  };

  useEffect(() => {
    // console.log("Fetch Data 2...");
    readData();
  }, [room, building, seatMin, seatMax, limit, page, remark]);

  return (
    <div className="p-4 mx-auto">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to={"/"}>หน้าแรก</Link>
          </li>
          <li>ฐานข้อมูลห้องเรียน</li>
        </ul>
      </div>
      <div className=" border my-4 border-[#EEE]"></div>

      <div className="mb-4 text-xl text-sky-800 font-bold">ฐานข้อมูลห้องเรียนทั้งหมด</div>

      <div className="mt-4">
        <PageListRoomCardStat
          countbuilding={countbuilding}
          countRoom={countRoom}
        />
      </div>
      <div className=" divider"></div>

      <div className="flex items-center gap-4 max-xl:grid max-xl:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
        <label className="input max-sm:w-full">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            placeholder="ค้นหาชื่อห้อง..."
            onChange={handleChangeRoom}
            value={room}
          />
        </label>

        <label className="select max-sm:w-full">
          <span className="label">อาคาร</span>
          <select onChange={handleBuilding} value={building}>
            <option value={""}>เลือกอาคาร</option>
            {nameBuilding.map((item, index) => (
              <option key={index}>{item.building}</option>
            ))}focus
          </select>
        </label>

        <label className="input max-sm:w-full">
          <span className="label">จำนวนที่นั่ง</span>
          <input
            type="text"
            placeholder="จำนวนตัวเลข"
            onChange={handleChangeSeatMin}
            value={seatMin}
          />
        </label>

        <label className="input max-sm:w-full">
          <span className="label">จำนวนที่นั่งสูงสุด</span>
          <input
            type="text"
            placeholder="จำนวนตัวเลข"
            name="seatMax"
            onChange={handleChangeSeatMax}
            value={seatMax}
          />
        </label>

        <label className="input max-sm:w-full">
          <span className="label">ประเภทห้อง</span>
          <input
            type="text"
            placeholder="ค้นหา..."
            onChange={handleChangeRemark}
            value={remark}
          />
        </label>
      </div>

      <div className="divider"></div>

      <div className=" flex justify-between items-center max-sm:block max-sm:mx-4">
        <div>
          <span>
            รายการค้นหาที่พบ :{" "}
            <span className="text-sky-800 italic">
              {total && total ? <>{total || 0}</> : "..."} รายการ
            </span>
          </span>
          <span className="text-sky-800 italic">
            {room && <p>ห้อง : {room || ""}</p>}
          </span>
          <span className="text-sky-800 italic">
            {building && <p>อาคาร : {building || ""}</p>}
          </span>
          <span className="text-sky-800 italic">
            {seatMin && <p>จำนวนที่นั่งมากกว่า : {seatMin || ""}</p>}
          </span>
          <span className="text-sky-800 italic">
            {seatMax && <p>จำนวนที่นั่งสูงสุด น้อยกว่า : {seatMax || ""}</p>}
          </span>
          <span className="text-sky-800 italic">
            {remark && <p>ประเภทห้อง : {remark || ""}</p>}
          </span>
          {(room || building || seatMin || seatMax || remark) && (
            <div>
              <button
                className="btn bg-sky-800 text-white btn-sm mt-2"
                onClick={resetSearch}
              >
                ล้างค่าการค้นหา
              </button>
            </div>
          )}
        </div>
        <div className=" flex gap-2 items-center">
          <p>แสดงข้อมูลครั้งละ</p>
          <select
            defaultValue="Color scheme"
            className="select select-accent w-max select-sm"
            onChange={handleLimitChange}
          >
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>150</option>
            <option>200</option>
          </select>
          <p>รายการ</p>
        </div>
      </div>

      <div className=" mt-4">
        {loading ? (
          <div className=" h-72">
            <CardLoading />
          </div>
        ) : (
          <div>
            {dataRoom === "ไม่พบข้อมูล" ? (
              <div className=" h-72 p-4">ไม่พบข้อมูล</div>
            ) : (
              <div>
                <div className=" grid grid-cols-5 gap-4 max-lg:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                  {dataRoom?.map((data, index) => (
                    <div
                      key={index}
                      className="border border-base-300 bg-white p-2 cursor-pointer hover:bg-[#32507B] hover:text-white rounded duration-300 shadow text-[#495057]"
                    >
                      <div className=" font-bold">
                        ห้อง : {data.room || "ไม่มีข้อมูล"}
                      </div>
                      <div className="divider m-0"></div>
                      <div className=" text-sm">
                        <div>อาคาร : {data.building || "ไม่มีข้อมูล"}</div>
                        <div>จำนวนที่นั่ง : {data.seat_min}</div>
                        <div>จำนวนที่นั่งสูงสุด : {data.seat_max}</div>
                        <div>ประเภทห้อง : {data.remark || ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className=" flex justify-end gap-2 max-md:justify-center mt-8">
        <div className="join space-x-4">
          <button
            className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
            onClick={handleFirstPage}
            disabled={page === 1}
          >
            <ChevronsLeft color="white" />
          </button>
          <button
            className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            <ChevronLeft color="white" />
          </button>
          <button className="join-item bg-base-300 px-4 shadow rounded text-sm">
            หน้าที่ {page} / {Math.ceil(total / limit)}
          </button>
          <button
            className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
            onClick={handleNext}
            disabled={page * limit >= total}
          >
            <ChevronRight color="white" />
          </button>

          <button
            className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
            onClick={handleLastPage}
            disabled={page >= Math.ceil(total / limit)}
          >
            <ChevronsRight color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageListRoom;
