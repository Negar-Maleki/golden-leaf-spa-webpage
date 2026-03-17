"use client";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { useEffect } from "react";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to }),
    )
  );
}

const tomorrow = dayjs().add(1, "day").startOf("day");
const initialValue = tomorrow.hour(9).minute(0);
const sixPM = dayjs().startOf("day").hour(18);

export default function ResponsiveDateTimePickers({
  settings,
  booking,
  service,
}) {
  const price = 23;
  const numGuests = 1;
  const servicePrice = 23;
  const range = { from: null, to: null };

  const { date, setDate, resetDate } = useReservation();

  useEffect(() => {
    if (!date) {
      setDate(initialValue);
    }
  }, [date, setDate]);

  return (
    <div className="flex flex-col justify-between max-w-[20rem] ">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="text-primary-950" components={["StaticDateTimePicker"]}>
          <StaticDateTimePicker
            maxTime={sixPM}
            minDate={tomorrow}
            shouldDisableTime={(timeValue, view) => {
              if (view === "hours") {
                const hour = timeValue.hour();
                return hour < 9 || hour > 18;
              }

              return false;
            }}
            value={date || initialValue}
            onChange={(newValue) => {
              if (!newValue) return;
              setDate(newValue);
              console.log(newValue.format("YYYY-MM-DDTHH:mm"));
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
        </div>
      </LocalizationProvider>

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-center gap-6">
          <p className="flex gap-2 items-baseline">
            <span className="text-2xl">${price}</span>

            <span className="">/minutes</span>
          </p>
          {numGuests ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;{numGuests}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">
                  Total ${servicePrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
