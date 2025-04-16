import { Link } from "react-router-dom";
import { readBookingRoom } from "../api/readBookingApi";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const PageBookingRoom = () => {
  const [bookingRoom, setBookingRoom] = useState([]);

  async function fetchBookingRoom() {
    try {
      const res = await readBookingRoom();
      //console.log(res.data.bookingRoom);
      const data = res.data.bookingRoom;
      setBookingRoom(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBookingRoom();
  }, []);
  return (
    <div className="p-4 mx-auto">
      <div className="breadcrumbs text-sm ">
        <ul>
          <li>
            <Link to={"/"}>หน้าแรก</Link>
          </li>
          <li>ข้อมูลการจองห้องเรียน</li>
        </ul>
      </div>
      <div className=" border my-4 border-[#EEE]"></div>

      <div className="mb-4 text-xl text-sky-800 font-bold">ข้อมูลการจองห้องเรียน</div>

      {/* <div>
        <div className=" grid grid-cols-1">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Total Likes</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-8 w-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Page Views</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <div className="stat-value">86%</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        </div>
      </div> */}

      <div className=" border my-4 border-[#EEE]"></div>

      <div>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead className=" bg-[#32507B] text-white">
              <tr className=" whitespace-nowrap truncate text-sm">
                <th>ลำดับ</th>
                <th>วันที่จอง</th>
                <th>ช่วงเวลา 1</th>
                <th>ช่วงเวลา 2</th>
                <th>ช่วงเวลา 3</th>
                <th>ช่วงเวลา 4</th>
                <th>ห้อง</th>
                <th>อาคาร</th>
                <th>ประเภทห้อง</th>
                <th>วิชา รหัสวิชา</th>
                <th>ผู้สอน</th>
                <th>คณะ</th>
                <th>ภาคปีการศึกษา</th>
                <th>จำนวนที่นั่ง</th>
                <th>จำนวนที่นั่งสูงสุด</th>
                <th>จองโดย</th>
                <th>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {bookingRoom.length > 0 ? (
                <>
                  {bookingRoom.map((room, index) => (
                    <tr
                      className=" whitespace-nowrap truncate hover:bg-gray-300 duration-300 cursor-pointer text-[#495057]"
                      key={index + 1}
                    >
                      <th>{index + 1}</th>
                      <td>วัน{dayjs(room.date).format("dddd D MMMM BBBB")}</td>
                      <td
                        className={`whitespace-nowrap truncate ${
                          room.timeSlot.includes("08.30-11.00")
                            ? "bg-sky-200"
                            : ""
                        }`}
                      >
                        {room.timeSlot.includes("08.30-11.00")
                          ? "08.30-11.00"
                          : "ว่าง"}
                      </td>
                      <td
                        className={`whitespace-nowrap truncate ${
                          room.timeSlot.includes("11.30-14.00")
                            ? "bg-sky-300"
                            : ""
                        }`}
                      >
                        {room.timeSlot.includes("11.30-14.00")
                          ? "11.30-14.00"
                          : "ว่าง"}
                      </td>
                      <td
                        className={`whitespace-nowrap truncate ${
                          room.timeSlot.includes("14.30-17.00")
                            ? "bg-sky-400"
                            : ""
                        }`}
                      >
                        {room.timeSlot.includes("14.30-17.00")
                          ? "14.30-17.00"
                          : "ว่าง"}
                      </td>
                      <td
                        className={`whitespace-nowrap truncate ${
                          room.timeSlot.includes("17.30-20.00")
                            ? "bg-sky-500"
                            : ""
                        }`}
                      >
                        {room.timeSlot.includes("17.30-20.00")
                          ? "17.30-20.00"
                          : "ว่าง"}
                      </td>
                      <td>{room.room}</td>
                      <td>{room.building}</td>
                      <td>{room.remark || "-"}</td>
                      <td>{room.course}</td>
                      <td>{room.teacher}</td>
                      <td>{room.faculty}</td>
                      <td>{room.semester}</td>
                      <td>{room.seat_min}</td>
                      <td>{room.seat_min}</td>
                      <td>{room.bookigngBy}</td>
                      <td>แก้ไข ลบ</td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="text-gray-500">
                  <td className=" p-4">ยังไม่มีการจอง</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PageBookingRoom;
