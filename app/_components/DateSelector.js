"use client";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useReservation } from "./ReservationContext";
import { DateTimePicker } from "@mui/x-date-pickers";
import { CLOSE_HOUR, OPEN_HOUR } from "../_utils/constants";
import { useEffect } from "react";
import { canFitBooking, getDisabledTimeSlots } from "../_utils/helpers";

const tomorrow = dayjs().add(1, "day").startOf("day");
const initialValue = tomorrow.hour(OPEN_HOUR).minute(0);

export default function ResponsiveDateTimePickers({
  service,
  bookedDates,
  bookings,
  requestedGuests = 1,
}) {
  const { date, setDate } = useReservation();

  useEffect(() => {
    if (!date) {
      setDate(initialValue);
    }
  }, [date, setDate]);

  const minTime = dayjs().hour(OPEN_HOUR).minute(0).second(0).millisecond(0);
  const maxTime = dayjs().hour(CLOSE_HOUR).minute(0).second(0).millisecond(0);

  const selectedBaseDay = (date || initialValue).second(0).millisecond(0);

  return (
    <div className="flex  items-center justify-between bg-accent-500 text-primary-800 h-[72px] gap-8 px-4 rounded-sm ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          maxTime={maxTime}
          minTime={minTime}
          minDate={tomorrow}
          timeSteps={{ hours: 1, minutes: 15 }}
          shouldDisableTime={(value, view) => {
            if (view === "minutes") {
              const minute = value.minute();

              if (![0, 15, 30, 45].includes(minute)) {
                return true;
              }

              const candidate = selectedBaseDay
                .minute(minute)
                .second(0)
                .millisecond(0);
              return !canFitBooking({
                bookings,
                proposedStart: dayjs.utc(candidate.toDate().toISOString()),
                serviceDuration: Number(service.duration),
                requestedGuests: Number(requestedGuests),
              });
            }
            if (view === "hours") {
              const hour = value.hour();

              const candidate = selectedBaseDay
                .hour(hour)
                .minute(selectedBaseDay.minute())
                .second(0)
                .millisecond(0);

              return !canFitBooking({
                bookings,
                proposedStart: dayjs.utc(candidate.toDate().toISOString()),
                serviceDuration: Number(service.duration),
                requestedGuests: Number(requestedGuests),
              });
            }

            return false;
          }}
          value={date || initialValue}
          onChange={(newValue) => {
            if (!newValue) return;
            setDate(newValue);
          }}
          sx={{
            "& .MuiPickersLayout-root": {
              color: "#1f2937",
            },
            "& .MuiPickersDay-root": {
              borderRadius: "8px",
              fontWeight: 500,
            },
            "& .MuiPickersDay-root.Mui-selected": {
              backgroundColor: "#d97706",
              color: "white",
            },
            "& .MuiButtonBase-root": {
              fontFamily: "inherit",
            },
            "& .MuiTypography-root": {
              fontFamily: "inherit",
            },
          }}
        />
      </LocalizationProvider>

      <div className="flex items-center gap-6">
        <p className="flex gap-2 items-baseline">
          <span className="text-2xl">{service.duration}</span>

          <span className=""> minutes</span>
        </p>

        <p>
          <span className="text-lg font-bold uppercase">
            Total ${service.price}
          </span>
        </p>
      </div>

      {/* {date ? (
        <button
          className="border border-primary-800 py-2 px-4 text-sm font-semibold"
          onClick={() => resetDate()}
        >
          Clear
        </button>
      ) : null} */}
    </div>
  );
}
