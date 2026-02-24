import { LIST_SIZE } from "../utils/constants";

export async function getAllBookings() {
  const res = await fetch("http://localhost:5000/api/bookings", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  const data = await res.json();

  return data;
}

export async function getBookings({ filter, sortBy, page }) {
  const res = await fetch("http://localhost:5000/api/bookings", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  let data = await res.json();

  if (filter) {
    data = data.filter((booking) => booking[filter.field] === filter.value);
  }

  if (sortBy) {
    if (sortBy.field === "date") {
      data = data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortBy.direction === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else {
      data = data.sort((a, b) =>
        sortBy.direction === "asc"
          ? a[sortBy.field] - b[sortBy.field]
          : b[sortBy.field] - a[sortBy.field]
      );
    }
  }
  const count = data.length;

  if (page) {
    const from = (page - 1) * LIST_SIZE;
    const to = from + LIST_SIZE;

    data = data.slice(from, to);
  }

  return { data, count };
}

export async function getBookingById(bookingId) {
  const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch booking");
  }
  const data = await res.json();

  return data;
}

export async function updateBooking(bookingId, bookingData) {
  let res;
  if (!bookingId) {
    res = await fetch(`http://localhost:5000/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
      credentials: "include",
    });
  } else {
    res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
      credentials: "include",
    });
  }
  if (!res.ok) {
    throw new Error("Failed to create booking");
  }
  const data = res.json();
  return data;
}

export async function deleteBookingApi(bookingId) {
  const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Faild to delete booking");
  }
}
