"use server";

import { se } from "date-fns/locale";
import { auth, signIn, signOut } from "./auth";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

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

export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session || !session.user?.id)
    throw new Error("You must be logged in to create a booking");

  const notes = (formData.get("notes") ?? "").toString().slice(0, 1000);

  const booking = await prisma.booking.create({
    data: {
      serviceId: bookingData.serviceId,
      customerId: session.user.id,
      date: new Date(bookingData.date),
      duration: bookingData.duration,
      status: "PENDING",
      notes: notes || null,
      totalPrice: bookingData.servicePrice,
      extraCost: 0,
      food: false,
      drink: false,
      paid: false,
    },
  });

  if (!booking) throw new Error("Booking could not be created");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
