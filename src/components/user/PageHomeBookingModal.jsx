import React from "react";
import { useEffect } from "react";

import useBookingRoomStore from "../../store/BookingRoom-Store";
import { CalendarClock } from "lucide-react";

const PageHomeBookingModal = ({
  handleCheckboxChange,
  handleSubmitBookingRoom,
  handleBookingRoomChange,
  formBooking,
  setFormBooking,
  setIsModalOpen,
  isLoading,
}) => {
  const getFaculty = useBookingRoomStore((state) => state.getFaculty);
  const getSemester = useBookingRoomStore((state) => state.getSemester);
  const getTimeSlot = useBookingRoomStore((state) => state.getTimeSlot);
  const faculty = useBookingRoomStore((state) => state.faculty);
  const semester = useBookingRoomStore((state) => state.semester);
  const timeSlot = useBookingRoomStore((state) => state.timeSlot);

  useEffect(() => {
    getFaculty();
    getSemester();
    getTimeSlot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <dialog open className="modal">
        <form onSubmit={handleSubmitBookingRoom}>
          <div className="modal-box max-w-none w-[768px] max-lg:max-w-2xl max-sm:w-full">
            <h2 className=" text-xl flex gap-2 items-center bg-[#32507B] text-white py-4 px-2 rounded">
              <CalendarClock />
              กำลังทำรายการจองห้อง
            </h2>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-2 max-md:w-full max-md:gap-2 mt-2 max-sm:grid-cols-1 max-sm:gap-0">
              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">วันที่</legend>
                <input
                  type="date"
                  name="date"
                  value={formBooking?.date}
                  onChange={(e) =>
                    setFormBooking({ ...formBooking, date: e.target.value })
                  }
                  className="input border w-full mb-4"
                />
              </fieldset>

              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend ">ห้อง</legend>
                <input
                  type="input"
                  className="input validator w-full uppercase"
                  required
                  placeholder="ห้องเรียน"
                  name="room"
                  value={formBooking?.room}
                  onChange={handleBookingRoomChange}
                />
                <p className="validator-hint">ระบุห้องเรียน</p>
              </fieldset>
            </div>

            <div className="w-full max-md:w-full max-md:gap-2 mb-4">
              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">เลือกช่วงเวลา</legend>
                <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-1">
                  {timeSlot?.data.map((time) => (
                    <label
                      key={time?.period_id}
                      className="flex items-center gap-2 w-max"
                    >
                      <input
                        type="checkbox"
                        className="checkbox"
                        name="timeSlot"
                        value={time?.period_id}
                        checked={formBooking.timeSlot.includes(
                          String(time.period_id)
                        )}
                        onChange={handleCheckboxChange}
                      />
                      {time?.period_name}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className=" grid grid-cols-2 gap-4 max-md:grid-cols-2 max-md:w-full max-md:gap-2 max-sm:grid-cols-1 max-sm:gap-0">
              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">ชื่อวิชา</legend>
                <input
                  type="input"
                  className="input validator w-full"
                  required
                  placeholder="ชื่อวิชา"
                  name="course"
                  value={formBooking?.course}
                  onChange={handleBookingRoomChange}
                />
                <p className="validator-hint">ระบุชื่อวิชาเรียน</p>
              </fieldset>

              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">รหัสวิชา</legend>
                <input
                  type="input"
                  className="input validator w-full"
                  required
                  placeholder="รหัสวิชา"
                  name="code"
                  value={formBooking?.code}
                  onChange={handleBookingRoomChange}
                />
                <p className="validator-hint">ระบุรหัสวิชา</p>
              </fieldset>
            </div>

            <div className=" grid grid-cols-2 gap-4 max-md:grid-cols-2 max-md:w-full max-md:gap-2 max-sm:grid-cols-1 max-sm:gap-0">
              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">ชื่อผู้สอน</legend>
                <input
                  type="input"
                  className="input validator w-full"
                  required
                  placeholder="ระบุชื่อผู้สอน"
                  name="teacher"
                  value={formBooking?.teacher}
                  onChange={handleBookingRoomChange}
                />
                <p className="validator-hint">ระบุชื่อผู้สอน</p>
              </fieldset>

              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend">ภาคปีการศึกษา</legend>
                <select
                  className="select validator w-full"
                  required
                  name="semester"
                  value={formBooking?.semester}
                  onChange={handleBookingRoomChange}
                >
                  <option disabled value="">
                    เลือก
                  </option>
                  {semester?.data?.length &&
                    semester?.data.map((data) => (
                      <option key={data?.sem_id} value={data?.sem_id}>
                        {data?.sem_name}
                      </option>
                    ))}
                </select>
                <p className="validator-hint">เลือกภาคปีการศึกษา</p>
              </fieldset>
            </div>

            <div className=" grid grid-cols-1 gap-4 max-md:grid-cols-1 w-full max-md:gap-2 ">
              <fieldset className="fieldset m-0 p-0">
                <legend className="fieldset-legend ">คณะ</legend>
                <select
                  className="select validator w-full"
                  required
                  name="faculty"
                  value={formBooking?.faculty}
                  onChange={handleBookingRoomChange}
                >
                  <option disabled value="">
                    เลือก
                  </option>

                  {faculty?.data?.length &&
                    faculty?.data.map((data, index) => (
                      <option key={index}>{data?.fac_name_th}</option>
                    ))}
                </select>
                <p className="validator-hint">เลือกคณะ</p>
              </fieldset>
            </div>
            <hr className="my-2 text-base-300" />
            <div className="modal-action">
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                ยกเลิก
              </button>
              <button className="btn bg-sky-800 text-white" disabled={isLoading}>
                {isLoading ? "กำลังบันทึก..." : "บันทึก"}
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default PageHomeBookingModal;
