"use server";

import { auth, signIn, signOut } from "./auth";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { getCustomer } from "./apiCustomers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { canFitBooking } from "../_utils/helpers";
import { redirect } from "next/navigation";
import { getBookingById } from "./apiBookings";

dayjs.extend(utc);

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const { name, email, phone, notes } = Object.fromEntries(formData);

  if (!session.user.id) throw new Error("Invalid session user ID");

  const updatedCustomer = await prisma.customer.update({
    where: { id: session.user.id },
    data: {
      name,
      email,
      phone,
      notes,
    },
  });

  if (!updatedCustomer) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createMessage(formData) {
  const { name, email, message } = Object.fromEntries(formData);
  const newMessage = await prisma.message.create({
    data: {
      name,
      email,
      message,
    },
  });

  if (!newMessage) throw new Error("Message could not be sent.");

  revalidatePath("/contact");
  redirect("/contact/thankyou");
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("You must be logged in to create a booking");
  }

  const customer = await getCustomer(session.user.email);

  if (!customer) {
    throw new Error("Customer record not found");
  }

  const notes = (formData.get("notes") ?? "").toString().slice(0, 1000);

  const rawNumGuests = formData.get("numGuests");
  const isCouples = bookingData.serviceName === "Couples Harmony";
  const numGuests = Number(rawNumGuests ?? (isCouples ? 2 : 1));

  if (!Number.isInteger(numGuests) || numGuests < 1) {
    throw new Error("Invalid number of guests");
  }

  const totalBookingPrice = numGuests * Number(bookingData.servicePrice);

  const bookingDate = new Date(bookingData.date);
  if (Number.isNaN(bookingDate.getTime())) {
    throw new Error("Invalid booking date");
  }

  const proposedStart = dayjs.utc(bookingDate);
  const proposedEnd = proposedStart.add(Number(bookingData.duration), "minute");

  const dayStart = proposedStart.startOf("day").toDate();
  const dayEnd = proposedStart.endOf("day").toDate();

  const existingBookings = await prisma.booking.findMany({
    where: {
      date: {
        gte: dayStart,
        lte: dayEnd,
      },
      status: {
        not: "CANCELLED",
      },
    },
    select: {
      date: true,
      duration: true,
      numGuests: true,
    },
  });

  const allowed = canFitBooking({
    bookings: existingBookings,
    proposedStart,
    serviceDuration: Number(bookingData.duration),
    requestedGuests: numGuests,
    maxCapacity: 5,
  });

  if (!allowed) {
    throw new Error(
      "This time is no longer available! Please try again by chosing other avaiable time",
    );
  }

  const booking = await prisma.booking.create({
    data: {
      serviceId: Number(bookingData.serviceId),
      customerId: customer.id,
      date: bookingDate,
      duration: Number(bookingData.duration),
      status: "PENDING",
      notes: notes || null,
      totalPrice: totalBookingPrice,
      extraCost: 0,
      food: false,
      drink: false,
      paid: false,
      numGuests,
    },
  });

  if (!booking) throw new Error("Booking could not be created");

  revalidatePath(`/services/${bookingData.servicesId}`);

  redirect("/services/thankyou");

}

export async function deleteBooking(bookingId) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const guestBookings = await getBookingById(session.user.id);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not allow to delete this booking!");
  }

  const deleted = await prisma.booking.delete({
    where: { id: Number(bookingId) },
  });
  if (!deleted) {
    throw new Error("Failed to delete booking");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const guestBookings = await getBookingById(session.user.id);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);

  const { numGuests, notes } = Object.fromEntries(formData);
  const bookingId = Number(formData.get("bookingId"));

  if (!guestBookingsIds.includes(bookingId)) {
    throw new Error("You are not allow to update this booking!");
  }

  const edit = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      numGuests: Number(numGuests),
      notes: notes.slice(0, 1000),
    },
  });

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
