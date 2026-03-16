import DateSelector from "@/app/_components/DateSelector";
import ReservationForm from "@/app/_components/ReservationForm";
import { getAllBookings, getBookingById } from "@/lib/apiBookings";


async function Reservation({ service }) {
const booking = await getBookingById(service.id);


  return (
    <div className="grid grid-cols-3 gap-8 mt-12 border border-primary-800  min-h-[400px]">
      <DateSelector />
      <ReservationForm />
    </div>
  );
}

export default Reservation;
