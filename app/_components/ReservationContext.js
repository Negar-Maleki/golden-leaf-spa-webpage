"use client";
import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";

const tomorrow = dayjs().add(1, "day").startOf("day");
const initialValue = tomorrow.hour(9).minute(0);
const ResevationContext = createContext();

function ReservationProvider({ children }) {
  const [date, setDate] = useState(initialValue);
  const resetDate = () => setDate(initialValue);

  return (
    <ResevationContext.Provider value={{ date, setDate, resetDate }}>
      {children}
    </ResevationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ResevationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
