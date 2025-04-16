/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ListFilter,
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { readAllRoom, readCountBuilding } from "../api/readapi";
import { debounce } from "lodash";
import { Suspense } from "react";
import CardLoading from "../components/CardLoading";
import PageAllRoomCardStat from "../components/user/PageAllRoomCardStat";

const PageUseReactQueryListRoom = () => {
  //ดึงข้อมูลห้อง
  const searchRoom = async ({ queryKey }) => {
    console.log("fetch data room...");
    const [_key, filters] = queryKey;
    const { room, building, seatMin, seatMax, limit, page, remark } = filters;
    const res = await readAllRoom(
      room,
      building,
      seatMin,
      seatMax,
      limit,
      page,
      remark
    );
    return res.data;
  };

  //ดึงข้อมูลตึก
  const fetchBuilding = async () => {
    console.log("fetch data building...");
    const res = await readCountBuilding();
    return res.data;
  };

  const [filters, setFilters] = useState({
    room: "",
    building: "",
    seatMin: "",
    seatMax: "",
    limit: 25,
    page: 1,
    remark: "",
  });

  const [countbuilding, setDBuildingLength] = useState(null);
  const [countRoom, setDRoomLength] = useState(null);

  const handleChangeTest = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setFilters((prev) => ({
      ...prev,
      page: (prev.page = 1),
    }));
  };

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const debouncedSearch = debounce((newFilters) => {
    setDebouncedFilters(newFilters);
  }, 0);

  const [total, setTotal] = useState(0);

  const { data: dataBuilding } = useQuery({
    queryKey: ["fetchBuilding"],
    queryFn: fetchBuilding,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchRoom", debouncedFilters],
    queryFn: searchRoom,
  });

  useEffect(() => {
    debouncedSearch(filters);
  }, [filters]);

  useEffect(() => {
    if (data) {
      setTotal(data?.totalCount_keyWord);
      setDRoomLength(data?.totalRoom);
    }

    if (dataBuilding) {
      setDBuildingLength(dataBuilding?.length);
    }
  }, [data]);

  const handleNext = () => {
    if (filters.page * filters.limit < total) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handlePrevious = () => {
    if (filters.page > 1) {
      setFilters((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const handleFirstPage = () => {
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const handleLastPage = () => {
    const lastPage = Math.ceil(total / filters.limit);
    setFilters((prev) => ({ ...prev, page: lastPage }));
  };

  return (
    <div>
      <div className="p-4">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>หน้าแรก</a>
            </li>
            <li>ห้องเรียนทั้งหมด</li>
          </ul>
        </div>
        <div className=" divider"></div>
        <div className=" font-bold text-xl">ทดสอบ Query</div>
        <div className=" divider"></div>
        <div>
          <PageAllRoomCardStat
            countRoom={countRoom}
            countbuilding={countbuilding}
          />
        </div>
        <div className=" divider"></div>

        <div className="p-4 flex items-center gap-4 flex-wrap">
          <div className="w-max max-sm:w-full">
            <ListFilter color="#32507B" size={35} />
          </div>

          <label className="input focus-within:input-primary max-sm:w-full">
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
              name="room"
              onChange={handleChangeTest}
              value={filters.room}
            />
          </label>

          <label className="select focus-within:input-primary max-sm:w-full">
            <span className="label">อาคาร</span>
            <select
              name="building"
              onChange={handleChangeTest}
              value={filters.building}
            >
              <option value={""}>เลือกอาคาร</option>
              {dataBuilding?.data?.map((item, index) => (
                <option key={index}>{item.building}</option>
              ))}
            </select>
          </label>

          <label className="input focus-within:input-primary max-sm:w-full">
            <span className="label">จำนวนที่นั่ง</span>
            <input
              type="text"
              placeholder="จำนวนตัวเลข"
              name="seatMin"
              onChange={handleChangeTest}
              value={filters.seatMin}
            />
          </label>

          <label className="input focus-within:input-primary max-sm:w-full">
            <span className="label">จำนวนที่นั่งสูงสุด</span>
            <input
              type="text"
              placeholder="จำนวนตัวเลข"
              name="seatMax"
              onChange={handleChangeTest}
              value={filters.seatMax}
            />
          </label>

          <label className="input focus-within:input-primary max-sm:w-full">
            <span className="label">Remark</span>
            <input
              type="text"
              placeholder="ค้นหา..."
              name="remark"
              onChange={handleChangeTest}
              value={filters.remark}
            />
          </label>
        </div>

        <div className="divider"></div>

        <div className=" flex justify-between items-center max-sm:block max-sm:mx-4">
          <div>
            <span>รายการค้นหาที่พบ : {total || ""} รายการ</span>
            <span>{filters.room && <p>ห้อง : {filters.room || ""}</p>}</span>
            <span>
              {filters.building && <p>อาคาร : {filters.building || ""}</p>}
            </span>
            <span>
              {filters.seatMin && <p>จำนวนที่นั่ง : {filters.seatMin || ""}</p>}
            </span>
            <span>
              {filters.seatMax && (
                <p>จำนวนที่นั่งสูงสุด : {filters.seatMax || ""}</p>
              )}
            </span>
            <span>
              {filters.remark && <p>ประเภทห้อง : {filters.remark || ""}</p>}
            </span>
          </div>
          <div className=" flex gap-2 items-center">
            <p>แสดงข้อมูลครั้งละ</p>
            <select
              className="select select-accent w-max select-sm"
              name="limit"
              onChange={handleChangeTest}
              value={filters.limit}
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
        <div className="bg-base-300 shadow my-4 rounded">
          <Suspense
            fallback={
              <div>
                <CardLoading />
              </div>
            }
          >
            <div>
              {isLoading && (
                <div>
                  <CardLoading />
                </div>
              )}
              {error && (
                <div className=" bg-red-500">
                  เกิดข้อผิดพลาด: {error.message}
                </div>
              )}

              {data?.data === "ไม่พบข้อมูล" ? (
                !isLoading && <p>ไม่พบข้อมูล</p>
              ) : (
                <div>
                  <div className=" grid grid-cols-6 gap-4 p-4 max-lg:grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {data?.data?.map((data, index) => (
                      <div
                        key={index}
                        className=" bg-white p-2 cursor-pointer hover:bg-[#32507B] hover:text-white rounded duration-300 shadow text-[#495057]"
                      >
                        <div>ห้อง : {data.room || "ไม่มีข้อมูล"}</div>
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
          </Suspense>
        </div>

        <div className=" flex justify-end gap-2 max-[426px]:justify-center">
          <div className="join space-x-4">
            <button
              className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
              onClick={handleFirstPage}
              disabled={filters.page === 1}
            >
              <ChevronsLeft color="white" />
            </button>
            <button
              className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
              onClick={handlePrevious}
              disabled={filters.page === 1}
            >
              <ChevronLeft color="white" />
            </button>
            <button className="join-item bg-base-300 px-4 shadow rounded text-sm">
              หน้าที่ {filters.page} / {Math.ceil(total / filters.limit || 1)}
            </button>
            <button
              className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
              onClick={handleNext}
              disabled={filters.page * filters.limit >= total}
            >
              <ChevronRight color="white" />
            </button>
            <button
              className="join-item bg-[#32507B] p-1 rounded-full cursor-pointer btn w-10"
              onClick={handleLastPage}
              disabled={filters.page >= Math.ceil(total / filters.limit)}
            >
              <ChevronsRight color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageUseReactQueryListRoom;
