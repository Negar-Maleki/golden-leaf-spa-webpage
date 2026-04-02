import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  CLOSE_HOUR,
  MAX_CAPACITY,
  OPEN_HOUR,
  SLOT_STEP,
} from "../_utils/constants";

dayjs.extend(utc);

function isOverlap(startA, endA, startB, endB) {
  return startA.isBefore(endB) && startB.isBefore(endA);
}

function getBookedGuestsInRange(bookings, rangeStart, rangeEnd) {
  let total = 0;
  for (const booking of bookings) {
    const bookingStart = dayjs.utc(booking.date);
    const bookingEnd = bookingStart.add(booking.duration, "minute");

    if (isOverlap(rangeStart, rangeEnd, bookingStart, bookingEnd)) {
      total += booking.numGuests;
    }
  }

  return total;
}
export function canFitBooking({
  bookings,
  proposedStart,
  serviceDuration,
  requestedGuests = 1,
  maxCapacity = MAX_CAPACITY,
}) {
  const proposedEnd = proposedStart.add(serviceDuration, "minute");

  // Check capacity in 15-minute slices
  let cursor = proposedStart;

  while (cursor.isBefore(proposedEnd)) {
    const slotEnd = cursor.add(SLOT_STEP, "minute");

    const alreadyBooked = getBookedGuestsInRange(bookings, cursor, slotEnd);

    if (alreadyBooked + requestedGuests > maxCapacity) {
      return false;
    }

    cursor = slotEnd;
  }

  return true;
}
function generateTimeSlotsForDay(
  day,
  openHour = OPEN_HOUR,
  closeHour = CLOSE_HOUR,
) {
  const slots = [];
  let current = day.hour(openHour).minute(0).second(0).millisecond(0);
  const end = day.hour(closeHour).minute(0).second(0).millisecond(0);

  while (current.isBefore(end)) {
    slots.push(current);
    current = current.add(SLOT_STEP, "minute");
  }

  return slots;
}

export function getDisabledTimeSlots({
  selectedDay,
  bookings,
  serviceDuration,
  requestedGuests,
  openHour = 9,
  closeHour = 18,
}) {
  const allSlots = generateTimeSlotsForDay(selectedDay, openHour, closeHour);

  return allSlots.filter((slot) => {
    const serviceEnd = slot.add(serviceDuration, "minute");

    // prevent booking beyond business hours
    if (
      serviceEnd.hour() > closeHour ||
      (serviceEnd.hour() === closeHour && serviceEnd.minute() > 0)
    ) {
      return true;
    }

    return !canFitBooking({
      bookings,
      proposedStart: slot,
      serviceDuration,
      requestedGuests,
    });
  });
}
