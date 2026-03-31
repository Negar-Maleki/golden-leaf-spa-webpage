"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { useEffect, useMemo, useState } from "react";

function ReservationReminder() {
  const { date, resetDate } = useReservation();
  const [isVisible, setIsVisible] = useState(false);

  const initialDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }, []);

  useEffect(() => {
    if (!date) return;

    const selectedDate = new Date(date.$d);
    selectedDate.setHours(0, 0, 0, 0);

    setIsVisible(selectedDate.getTime() !== initialDate.getTime());
  }, [date, initialDate]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text-lg font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your date <br />
        {format(new Date(date.$d), "MMM dd yyyy")}
      </p>

      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={() => {
          resetDate();
          setIsVisible(false);
        }}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;
