import axios from "axios";

// อ่านข้อมูลและทำการค้นหาข้อมูล
export const readAllRoom = async (
  room,
  building,
  seatMin,
  seatMax,
  limit,
  page,
  remark
) => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/room`, {
    params: {
      room,
      building,
      seatMin,
      seatMax,
      limit,
      page,
      remark,
    },
  });
};

// อ่านข้อมูลจำนวนอาคาร
export const readCountBuilding = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/building`);
};

// อ่านข้อมูลจำนวนห้อง
export const readCountRoom = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/room`);
};

// อ่านข้อมูลคณะ
export const readFaculty = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/faculty`);
};

// อ่านข้อมูลช่วงเวลาเรียน
export const readTimeSlot = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/period-time`);
};

// อ่านข้อมูลภาคการศึกษา
export const readSemester = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/semester`);
};
