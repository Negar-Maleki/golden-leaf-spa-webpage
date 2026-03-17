import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getAllBookings, getBookingById } from "@/lib/apiBookings";
import { getSettings } from "@/lib/apiSettings";

async function Reservation({ service }) {
  const booking = await getBookingById(service.id);
  const settings = await getSettings()

  return (
  <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] justify-items-center gap-8 mt-12 border border-primary-800 min-h-[400px]">
  <DateSelector settings={settings} booking={booking} service={service}/>
    <ReservationForm service={service} />
</div>
  );
}

export default Reservation;
