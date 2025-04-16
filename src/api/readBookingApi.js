import axios from "axios";

// อ่านข้อมูลการจองทั้งหมด
export const readBookingRoom = async () => {
  return axios.get(`${import.meta.env.VITE_BASE_URL}/booking/room`);
};

// อ่านข้อมูลการจองตาม ID
export const readBookingRoomId = async (bookingId) => {
  return axios.get(
    `${import.meta.env.VITE_BASE_URL}/booking/room/${bookingId}`
  );
};

// ลบการจอง ID
export const removeBookingRoomId = async (bookingId) => {
  return axios.delete(
    `${import.meta.env.VITE_BASE_URL}/booking/room/remove/${bookingId}`
  );
};

// สร้างข้อมูลการจอง
export const createBookingRoom = async (dateBooking) => {
  return axios.post(
    `${import.meta.env.VITE_BASE_URL}/booking/room`,
    dateBooking
  );
};

// สร้างข้อมูลการจอง
export const updateBookingRoom = async (bookingId, dateBooking) => {
  return axios.put(
    `${import.meta.env.VITE_BASE_URL}/booking/room/edit/${bookingId}`,
    dateBooking
  );
};
