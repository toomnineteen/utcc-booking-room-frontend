import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { readFaculty, readSemester, readTimeSlot } from "../api/readapi";

const bookingRoomStore = (set) => ({
  user: null,
  token: null,
  faculty: [],
  timeSlot: [],
  semester: [],
  getFaculty: async () => {
    try {
      const res = await readFaculty();
      set({ faculty: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getTimeSlot: async () => {
    try {
      const res = await readTimeSlot();
      set({ timeSlot: res.data });
    } catch (error) {
      console.log(error);
    }
  },
  getSemester: async () => {
    try {
      const res = await readSemester();
      set({ semester: res.data });
    } catch (error) {
      console.log(error);
    }
  },
});

const usePersist = {
  name: "booking-room-store",
  storage: createJSONStorage(() => localStorage),
};

const useBookingRoomStore = create(persist(bookingRoomStore, usePersist));

export default useBookingRoomStore;
