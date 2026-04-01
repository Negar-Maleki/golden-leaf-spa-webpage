import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getBookingById } from "@/app/_lib/apiBookings";
import { getSettings } from "@/app/_lib/apiSettings";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ service }) {
  const booking = await getBookingById(service.id);
  const settings = await getSettings();
  const session = await auth();

  return (
    <div className="grid grid-rows-1 lg:grid-cols-[31.5rem_1fr] justify-items-center mt-12 gap-2 border border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} booking={booking} service={service} />
      {session?.user ? (
        <ReservationForm service={service} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
