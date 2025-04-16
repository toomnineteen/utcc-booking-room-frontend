import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import thLocale from "@fullcalendar/core/locales/th";

const PageHome = () => {
  const [events, setEvents] = useState([
    {
      title: "ห้อง 1301",
      start: "2025-03-31T08:30:00",
      end: "2025-03-31T11:00:00",
      extendedProps: {
        timeSlot: "09:00-12:00",
        course: "Math 102 - Calculus",
        teacher: "อาจารย์สมชาย",
      },
    },
    {
      title: "ห้อง 1301",
      start: "2025-03-31T11:30:00",
      end: "2025-03-31T14:00:00",
      extendedProps: {
        timeSlot: "11:30-14:00",
        course: "Math 102 - Calculus",
        teacher: "อาจารย์สมชาย",
      },
    },
    {
      title: "ห้อง 1301",
      start: "2025-03-31T14:30:00",
      end: "2025-03-31T16:00:00",
      extendedProps: {
        timeSlot: "14:30-16:00",
        course: "Math 102 - Calculus",
        teacher: "อาจารย์สมชาย",
      },
    },
    {
      title: "ห้อง 1301",
      start: "2025-04-01T08:30:00",
      end: "2025-04-01T11:00:00",
      extendedProps: {
        timeSlot: "08:30-11:00",
        course: "Math 102 - Calculus",
        teacher: "อาจารย์สมชาย",
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-4">
      <div className="breadcrumbs text-sm ">
        <ul>
          <li>หน้าแรก</li>
        </ul>
      </div>
      <div className="divider"></div>
      <>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventClick={toggleModal}
          eventClassNames="cursor-pointer"
          height={"75vh"}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locale={thLocale}
          events={events}
          eventContent={(e) => {
            // ในมุมมอง Month/Week: แสดงแค่ 10 รายการ
            if (e.view.type === "dayGridMonth") {
              return (
                <div>
                  <div>{e.event.title}</div>
                </div>
              );
            }
            if (
              e.view.type === "dayGridMonth" ||
              e.view.type === "timeGridWeek"
            ) {
              return (
                <div>
                  <div>{e.event.title}</div>
                  <div>{e.event.extendedProps.timeSlot}</div>
                </div>
              );
            }
            // ในมุมมอง Day: แสดงรายละเอียดเพิ่มเติม เช่น ชื่อวิชา, อาจารย์
            if (e.view.type === "timeGridDay") {
              return (
                <div>
                  <div>{e.event.title}</div>
                  <div>วิชา: {e.event.extendedProps.course}</div>
                  <div>อาจารย์: {e.event.extendedProps.teacher}</div>
                  <div>{e.event.extendedProps.timeSlot}</div>
                </div>
              );
            }
          }}
          eventLimit={10} // ในเดือนและสัปดาห์ จะแสดงแค่ 10 รายการ
        />
      </>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-2xl font-bold mb-4">ยินดีต้อนรับสู่ Modal</h2>
            <p>นี่คือลองการใช้งาน Modal ใน DaisyUI</p>
            <div className="modal-action ">
              <button onClick={toggleModal} className="btn">
                ปิด
              </button>
              <button onClick={toggleModal} className="btn btn-primary">
                อัพเดท
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageHome;
