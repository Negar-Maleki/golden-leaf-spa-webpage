"use client";

import { useState } from "react";
import { createBooking } from "../_lib/actions";
import { MAX_CAPACITY } from "../_utils/constants";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";
import Image from "next/image";

function ReservationForm({ service, user }) {
  const { date, resetDate } = useReservation();
  const [isBooking, setIsBooking] = useState(false);
  const [numGuest, setNumsGuest] = useState(0);

  function handleGuests(e) {
    const value = e.target.value;
    setNumsGuest(value);
    if (value > 0) {
      setIsBooking(true);
    }
  }

  const {
    duration,
    price: servicePrice,
    id: serviceId,
    name: serviceName,
  } = service;

  const maxCapacity = serviceName === "Couples Harmony" ? 2 : MAX_CAPACITY;
  const dateValue = date?.$d ? date.$d.toISOString() : null;

  const bookingData = {
    date: dateValue,
    servicePrice,
    duration,
    serviceId,
    serviceName,
  };

  const createBookingData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01] ">
      <div className="bg-primary-800 text-primary-300 px-2 py-2 flex justify-between items-center">
        <p>Logged in as {user.name}</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
            width="30"
            height="60"
          />
          <p>{user.name}</p>
        </div>
      </div>
      <p className="px-2">
        You are reserving <span className="font-bold">{service.name}</span> on{" "}
        <span className="font-bold">
          {date.$d ? date.format("MMMM Do YYYY, h:mm a") : "..."}
        </span>
      </p>

      <form
        action={async (formData) => {
          await createBookingData(formData);
          resetDate();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col "
      >
        {maxCapacity === 2 ? (
          <div className="space-y-2">
            <p>
              This service is designed for couples and accommodates up to two
              people.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
              onChange={handleGuests}
            >
              <option value="" key="">
                Select number of guests...
              </option>
              {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="notes">
            Anything we should know about your requierments?
          </label>
          <textarea
            name="notes"
            id="notes"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-between items-center">
          {!isBooking ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <>
              <p className="text-base">{`Total amount for your resevation is £${numGuest * servicePrice}`}</p>
              <div>
                <SubmitButton pendingLabel="Reserving....">
                  Reserve now
                </SubmitButton>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
