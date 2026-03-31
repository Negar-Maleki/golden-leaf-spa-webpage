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

// export async function createBooking(bookingData, formData) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in to create a booking");

//   const newBooking = {
//     ...bookingData,
//     customerId: session.user.guestId,
//     note: formData.get("note").slice(0, 1000),
//     extrasPrice: 0,
//     totalPrice: bookingData.servicePrice,
//     isPaid: false,
//     food: false,
//     drink: false,
//     status: "unconfirmed",
//   };

//   await prisma.booking.create({ data: newBooking });

//   if (error) throw new Error("Booking could not be created");

//   revalidatePath(`/cabins/${bookingData.cabinId}`);

//   redirect("/cabins/thankyou");
// }

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
