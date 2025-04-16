import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  readBookingRoomId,
  removeBookingRoomId,
  updateBookingRoom,
} from "../../api/readBookingApi";
import useBookingRoomStore from "../../store/BookingRoom-Store";
import Swal from "sweetalert2/dist/sweetalert2.js";
import dayjs from "dayjs";
import "dayjs/locale/th";
import CardLoadingEditBooking from "../ui/CardLoadingEditBooking";

const PageHomeBookingEdit = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const getFaculty = useBookingRoomStore((state) => state.getFaculty);
  const getSemester = useBookingRoomStore((state) => state.getSemester);
  const getTimeSlot = useBookingRoomStore((state) => state.getTimeSlot);
  const faculty = useBookingRoomStore((state) => state.faculty);
  const semester = useBookingRoomStore((state) => state.semester);
  const timeSlot = useBookingRoomStore((state) => state.timeSlot);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getFaculty();
    getSemester();
    getTimeSlot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formDataEdit, setFormDataEdit] = useState({
    date: "",
    timeSlot: [],
    course: "",
    code: "",
    teacher: "",
    semester: "",
    faculty: "",
    room: "",
    building: "",
    seat_min: "",
    seat_max: "",
    remark: "",
    bookingBy: "",
    createdAt: "",
    updatedAt: "",
  });

  //console.log("ข้อมูล", formDataEdit);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormDataEdit((prev) => {
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

  async function fetchDataId() {
    try {
      setisLoading(true);
      const res = await readBookingRoomId(bookingId);
      //console.log(res.data);
      const data = res?.data?.room;

      if (!data) {
        console.log("ไม่พบข้อมูล room");
        return;
      }

      setFormDataEdit({
        date: data?.date,
        timeSlot: data?.timeSlot,
        course: data?.course,
        code: data?.code,
        teacher: data?.teacher,
        semester: data?.semester,
        faculty: data?.faculty,
        room: data?.room,
        building: data?.building,
        seat_min: data?.seat_min,
        seat_max: data?.seat_max,
        remark: data?.remark,
        bookingBy: data?.bookingBy,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    fetchDataId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBookingRoomChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeBookingId = async () => {
    try {
      Swal.fire({
        text: "ต้องการลบการจองนี้ใช่หรือไม่ ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await removeBookingRoomId(bookingId); // รอให้ลบเสร็จก่อน
            console.log(res);

            Swal.fire({
              text: res.data.message,
              icon: "success",
            });

            navigate(-1);
          } catch (error) {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "ไม่สามารถลบข้อมูลได้",
              icon: "error",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdateBookingRoom = async (e) => {
    e.preventDefault();
    Swal.fire({
      text: "กำลังตรวจสอบข้อมูล",
      icon: "question",
    });
    try {
      const res = await updateBookingRoom(bookingId, formDataEdit);

      // console.log(res.data);

      if (res.data.status === false) {
        return Swal.fire({
          text: res.data.message,
          icon: "warning",
        });
      }

      if (res.data.success === false) {
        return Swal.fire({
          text: res.data.message,
          icon: "warning",
        });
      }

      if (res.data.success === true) {
        navigate(-1);
        return Swal.fire({
          text: "อัพเดทข้อมูลการจองเรียบร้อย",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" p-4">
      <div className="breadcrumbs text-sm ">
        <ul>
          <li>หน้าแรก</li>
          <li>แก้ไขข้อมูลการจอง</li>
        </ul>
      </div>
      <div className=" border my-4 border-[#EEE]"></div>

      <section className="max-w-5xl mx-auto">
        <div className="flex gap-2 items-center mb-4 flex-wrap">
          <Link
            to={-1}
            className=" btn btn-outline btn-info btn-sm flex gap-2 items-center hover:text-white"
          >
            ย้อนกลับ
          </Link>
          <div className=" text-xl ">แก้ไขข้อมูลการจอง</div>
        </div>

        {isLoading ? (
          <CardLoadingEditBooking />
        ) : (
          <form onSubmit={handleSubmitUpdateBookingRoom}>
            <div className=" border bg-white p-4 border-base-200 shadow mb-4 rounded">
              <div className=" bg-[#32507B] py-2 px-2 rounded text-white mb-4">
                ข้อมูลห้องเรียน
              </div>

              <div className=" grid grid-cols-2 gap-4 max-sm:grid-cols-1 items-center max-md:grid-cols-1">

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">วันที่จอง</legend>
                  <input
                    type="date"
                    className="input w-full"
                    value={formDataEdit?.date}
                    name="date"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">เลือกช่วงเวลา</legend>
                  <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">
                    {timeSlot?.data.map((time, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-2 w-max"
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          name="timeSlot"
                          value={time?.period_name}
                          checked={formDataEdit.timeSlot.includes(
                            String(time.period_name)
                          )}
                          onChange={handleCheckboxChange}
                        />
                        {time?.period_name}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ห้อง</legend>
                  <input
                    type="text"
                    className="input w-full uppercase"
                    value={formDataEdit?.room}
                    name="room"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ภาคปีการศึกษา</legend>
                  <select
                    className="select w-full"
                    required
                    name="semester"
                    value={formDataEdit?.semester}
                    onChange={handleBookingRoomChange}
                  >
                    <option disabled value="">
                      เลือก
                    </option>
                    {semester?.data?.length &&
                      semester?.data?.map((data, index) => (
                        <option key={index}>{data?.sem_name}</option>
                      ))}
                  </select>
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">อาคาร</legend>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={formDataEdit?.building}
                    name="building"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">จำนวนที่นั่ง</legend>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={formDataEdit?.seat_min}
                    name="seat_min"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">
                    จำนวนที่นั่งสูงสุด
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={formDataEdit?.seat_max}
                    name="seat_max"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>

                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ประเภทห้อง</legend>
                  <input
                    type="text"
                    className="input w-full"
                    disabled
                    value={formDataEdit?.remark || "-"}
                    name="remark"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>
              </div>
            </div>

            <div className=" border bg-white p-4 border-base-200 shadow rounded mb-4">
              <div className=" bg-[#32507B] py-2 px-2 rounded text-white mb-2">
                ข้อมูลผู้สอน
              </div>
              <div className=" grid grid-cols-4 gap-4 items-center max-sm:grid-cols-1">
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ชื่อวิชา</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={formDataEdit?.course}
                    name="course"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">รหัสวิชา</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={formDataEdit?.code}
                    name="code"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ผู้สอน</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={formDataEdit?.teacher}
                    name="teacher"
                    onChange={handleBookingRoomChange}
                  />
                </fieldset>
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">คณะ</legend>
                  <select
                    className="select w-full"
                    required
                    name="faculty"
                    value={formDataEdit?.faculty}
                    onChange={handleBookingRoomChange}
                  >
                    <option disabled value="">
                      เลือก
                    </option>

                    {faculty?.data?.length &&
                      faculty?.data?.map((data, index) => (
                        <option key={index}>{data?.fac_name_th}</option>
                      ))}
                  </select>
                </fieldset>
              </div>
            </div>

            <div className=" border bg-white p-4 border-base-200 shadow rounded mb-6">
              <div className=" bg-[#32507B] py-2 px-2 rounded text-white mb-2">
                ข้อมูลอื่นๆ
              </div>
              <div className=" grid grid-cols-3 gap-4 items-center max-sm:grid-cols-1">
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">ผู้จองห้อง</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={formDataEdit?.bookingBy}
                    disabled
                  />
                </fieldset>
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">สร้างเมื่อ</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={dayjs(formDataEdit?.createdAt).format(
                      "วันdddd ที่ D MMMM BBBB เวลา h:mm น."
                    )}
                    disabled
                  />
                </fieldset>
                <fieldset className="fieldset m-0 p-0">
                  <legend className="fieldset-legend">อัพเดทเมื่อ</legend>
                  <input
                    type="text"
                    className="input w-full"
                    value={dayjs(`${formDataEdit?.updatedAt}`).format(
                      "วันdddd ที่ D MMMM BBBB เวลา h:mm น."
                    )}
                    disabled
                  />
                </fieldset>
              </div>
            </div>

            <div className=" flex gap-4 justify-between flex-wrap">
              <button className="bg-sky-800 text-white btn max-sm:w-full">
                อัพเดทข้อมูล
              </button>
              <span
                className="btn btn-ghost max-sm:w-full underline border border-black"
                onClick={removeBookingId}
              >
                ลบข้อมูล
              </span>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default PageHomeBookingEdit;
