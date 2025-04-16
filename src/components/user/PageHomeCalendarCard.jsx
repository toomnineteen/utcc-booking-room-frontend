import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
dayjs.locale("th");
import "react-calendar/dist/Calendar.css";
import "../../Calendar.css";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
} from "lucide-react";
import PageHomeBookingModal from "./PageHomeBookingModal";
import { createBookingRoom, readBookingRoom } from "../../api/readBookingApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CardLoadingSkeleton from "../ui/CardLoadingSkeleton";
import Cookies from "js-cookie";

const PageHomeCalendarCard = () => {
  async function fetchBooking() {
    try {
      setisLoading(true);
      const fetch = await readBookingRoom();
      //console.log(fetch.data.bookingRoom);
      const data = fetch?.data?.bookingRoom;
      setDataBooking(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  const [isLoading, setisLoading] = useState(true);
  const [bookings, setDataBooking] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  //console.log(selectedDate);

  const bookingsForDay = bookings.filter(
    (booking) => selectedDate && dayjs(booking.date).isSame(selectedDate, "day")
  );

  const convertToBuddhistYear = (date) =>
    dayjs(date).format("dddd D MMMM BBBB");

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setActiveDate(today);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    Cookies.set("selectedDate", date.toISOString()); // บันทึกวันที่ใน cookie
  };

  useEffect(() => {
    const savedDate = Cookies.get("selectedDate");
    if (savedDate) {
      setSelectedDate(new Date(savedDate)); // ใช้วันที่จาก cookie
    } else {
      setSelectedDate(new Date()); // ถ้าไม่มี ให้ใช้วันที่ปัจจุบัน
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [formBooking, setFormBooking] = useState({
    date: "",
    timeSlot: [],
    course: "",
    code: "",
    teacher: "",
    semester: "",
    faculty: "",
    room: "",
  });

  //console.log("กำลังทำการจอง", formBooking);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormBooking((prev) => {
      let updatedTimeSlot = [...prev.timeSlot];

      if (checked) {
        // ถ้าเลือก ให้เพิ่มเข้า array
        updatedTimeSlot.push(value);
      } else {
        // ถ้า uncheck ให้ลบออก
        updatedTimeSlot = updatedTimeSlot.filter((v) => v !== value);
      }

      return {
        ...prev,
        timeSlot: updatedTimeSlot,
      };
    });
  };

  const handleBookingRoomChange = (e) => {
    const { name, value } = e.target;
    setFormBooking((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBookingRoom = async (e) => {
    e.preventDefault();

    if (!formBooking.date) {
      return Swal.fire({
        text: "เพิ่มข้อมูลวันที่ทำการจอง",
        icon: "info",
      });
    }

    if (formBooking.timeSlot.length === 0) {
      return Swal.fire({
        text: "เพิ่มข้อมูลช่วงเวลา",
        icon: "info",
      });
    }

    try {
      setisLoading(true);
      const data = await createBookingRoom(formBooking);

      //console.log(data);

      if (data.data.success === false) {
        return Swal.fire({
          text: data.data.message,
          icon: "info",
        });
      }

      if (data.data.success === true) {
        setIsModalOpen(false);
        fetchBooking();
        setFormBooking({
          date: "",
          timeSlot: "",
          course: "",
          code: "",
          teacher: "",
          semester: "",
          faculty: "",
          room: "",
        });
        return Swal.fire({
          text: data.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setFormBooking((prev) => ({
        ...prev,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      }));
    }
  }, [selectedDate]);

  const holidays = [
    { date: "2025-04-06", name: "วันจักรี" },
    { date: "2025-04-13", name: "วันสงกรานต์" },
    { date: "2025-04-14", name: "วันสงกรานต์" },
    { date: "2025-04-15", name: "วันสงกรานต์" },
    { date: "2025-04-16", name: "วันหยุดชดเชยวันสงกรานต์" },
    { date: "2025-05-01", name: "วันแรงงาน" },
    { date: "2025-05-04", name: "วันฉัตรมงคล" },
    { date: "2025-05-05", name: "วันหยุดชดเชยวันฉัตรมงคล" },
    { date: "2025-05-09", name: "วันพืชมงคล" },
  ];

  const getHolidayName = (date) => {
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    const holiday = holidays.find((h) => h.date === dateStr);
    return holiday ? holiday.name : null;
  };

  const holidayName = getHolidayName(dayjs(selectedDate));

  return (
    <div>
      <div className="mb-4 text-xl text-sky-800 font-bold">แสดงข้อมูลการจองห้องเรียน</div>

      <div className="flex gap-4 max-lg:grid max-lg:grid-cols-1 max-[1240px]:grid max-[1240px]:grid-cols-1">
        <div className=" border rounded shadow p-4 border-base-200 w-1/2 max-lg:w-full max-[1240px]:w-full">
          <div className=" flex justify-between items-center bg-white p-4 border border-base-300">
            <p>ปฏิทิน</p>
            <div className="flex gap-2">
              <button
                onClick={goToToday}
                className="bg-sky-800 border border-white px-4 p-2 rounded cursor-pointer text-white hover:bg-white hover:text-black duration-300 hover:border-black"
              >
                วันนี้
              </button>
              <button
                onClick={handleOpenModal}
                className="bg-sky-800 border border-white px-4 p-2 rounded cursor-pointer text-white hover:bg-white hover:text-black duration-300 hover:border-black flex gap-1 items-center"
              >
                <Plus size={20} />
                <p>จอง</p>
              </button>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Calendar
              onClickDay={handleDateClick}
              activeStartDate={activeDate}
              prevLabel={<ChevronLeft size={25} />}
              nextLabel={<ChevronRight size={25} />}
              prev2Label={<ChevronsLeft size={25} />}
              next2Label={<ChevronsRight size={25} />}
              defaultActiveStartDate={new Date()}
              onChange={setSelectedDate}
              value={selectedDate}
              minDetail="year"
              showNavigation={true}
              locale="th-TH"
              calendarType="gregory"
              onActiveStartDateChange={({ activeStartDate }) =>
                setActiveDate(activeStartDate)
              }
              tileContent={({ date }) => {
                const hasBooking = bookings.some((booking) =>
                  dayjs(booking.date).isSame(date, "day")
                );

                const holidayName = getHolidayName(date);

                return (
                  <div className="mt-4">
                    {holidayName && (
                      <p className="text-center w-2 h-2 rounded-full bg-sky-300 mx-auto mt-4"></p>
                    )}
                    {hasBooking && (
                      <div className="w-2 h-2 bg-green-700 mx-auto rounded-full mt-2"></div>
                    )}
                  </div>
                );
              }}
            />
            <div className="border p-4 mt-4 border-base-200 bg-white grid grid-cols-2 gap-4 max-[1420px]:grid-cols-2 max-[520px]:grid-cols-2">
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-green-700 rounded-full border border-base-300"></div>
                <div className=" text-nowrap truncate">มีการจอง</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-5 h-5 bg-sky-300 rounded-full border border-base-300"></div>
                <div className=" text-nowrap truncate">วันหยุด</div>
              </div>
              <div className=" flex gap-2 items-center">
                <div className="w-5 h-5 bg-pink-200 border border-base-300"></div>
                <div className=" text-nowrap truncate">วันที่เลือก</div>
              </div>
              <div className=" flex gap-2 items-center ">
                <div className="w-5 h-5 bg-[#ffff76] border border-base-300"></div>
                <div className="text-nowrap truncate">วันปัจจุบัน</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded shadow p-4 border-base-200 w-full">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-6 bg-white w-full border border-base-300">
                วัน{convertToBuddhistYear(selectedDate)}
              </div>
            </div>

            <div className="overflow-x-auto border border-base-300 rounded mb-4 mt-4 bg-white">
              <table className="table table-xs">
                <thead className=" bg-sky-800 text-white text-xs">
                  <tr>
                    <th>ห้อง</th>
                    <th>วิชา</th>
                    <th>ผู้สอน</th>
                    <th>เวลา 1</th>
                    <th>เวลา 2</th>
                    <th>เวลา 3</th>
                    <th>เวลา 4</th>
                    <th>คณะ</th>
                    <th>ภาคปีการศึกษา</th>
                    <th>ประเภทห้อง</th>
                    <th>จัดการ</th>
                  </tr>
                </thead>

                <tbody>
                  {holidayName && (
                    <tr className="bg-red-100 text-red-600 text-center font-semibold">
                      <td colSpan={12}>{`วันหยุด: ${holidayName}`}</td>
                    </tr>
                  )}
                  {isLoading ? (
                    <CardLoadingSkeleton />
                  ) : (
                    <>
                      {bookingsForDay.length > 0 ? (
                        <>
                          {bookingsForDay.map((booking, index) => (
                            <tr
                              key={index}
                              className="hover:bg-base-300 cursor-pointer"
                            >
                              <td className=" whitespace-nowrap truncate uppercase">
                                {booking.room}
                              </td>
                              <td className=" whitespace-nowrap truncate">
                                {booking.course} ({booking.code})
                              </td>
                              <td className=" whitespace-nowrap truncate capitalize">
                                {booking.teacher}
                              </td>
                              <td
                                className={`whitespace-nowrap truncate ${
                                  booking.timeSlot.includes("08.30-11.00")
                                    ? "bg-sky-200"
                                    : ""
                                }`}
                              >
                                {booking.timeSlot.includes("08.30-11.00")
                                  ? "08.30-11.00"
                                  : "ว่าง"}
                              </td>
                              <td
                                className={`whitespace-nowrap truncate ${
                                  booking.timeSlot.includes("11.30-14.00")
                                    ? "bg-sky-300"
                                    : ""
                                }`}
                              >
                                {booking.timeSlot.includes("11.30-14.00")
                                  ? "11.30-14.00"
                                  : "ว่าง"}
                              </td>
                              <td
                                className={`whitespace-nowrap truncate ${
                                  booking.timeSlot.includes("14.30-17.00")
                                    ? "bg-sky-400"
                                    : ""
                                }`}
                              >
                                {booking.timeSlot.includes("14.30-17.00")
                                  ? "14.30-17.00"
                                  : "ว่าง"}
                              </td>
                              <td
                                className={`whitespace-nowrap truncate ${
                                  booking.timeSlot.includes("17.30-20.00")
                                    ? "bg-sky-500"
                                    : ""
                                }`}
                              >
                                {booking.timeSlot.includes("17.30-20.00")
                                  ? "17.30-20.00"
                                  : "ว่าง"}
                              </td>
                              <td className=" whitespace-nowrap truncate">
                                {booking.faculty}
                              </td>
                              <td className=" whitespace-nowrap truncate">
                                {booking.semester}
                              </td>
                              <td className=" whitespace-nowrap truncate">
                                {booking.remark || "-"}
                              </td>
                              <td className="flex gap-2 whitespace-nowrap truncate">
                                <Link
                                  to={`/edit/booking/room/${booking._id}`}
                                  className="btn btn-xs bg-sky-800 text-white text-nowrap truncate hover:text-white"
                                >
                                  <Search size={15} />
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr className="text-gray-500">
                          <td className=" p-4">ยังไม่มีการจอง</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {isModalOpen && (
            <PageHomeBookingModal
              isLoading={isLoading}
              handleCheckboxChange={handleCheckboxChange}
              handleSubmitBookingRoom={handleSubmitBookingRoom}
              handleBookingRoomChange={handleBookingRoomChange}
              selectedDate={selectedDate}
              formBooking={formBooking}
              setFormBooking={setFormBooking}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHomeCalendarCard;
