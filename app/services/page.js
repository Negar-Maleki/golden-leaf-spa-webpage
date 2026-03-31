import ServiceList from "@/app/_components/ServiceList";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// export const revalidate = 3600;

export const metadata = {
  title: "Services",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.duration ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Spa
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        From therapeutic massage and herbal treatments to salt pools, sauna
        sessions, and floatation therapy, every service is designed to relax the
        body and restore balance to the mind. Our outdoor hot water pools and
        garden seating areas invite guests to unwind in peaceful surroundings,
        where time slows and stress gently fades away. At Golden Leaf Spa,
        wellness is not just a treatment — it&apos;s a feeling. A quiet moment.
        A warm glow. A breath of serenity.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <ServiceList filter={filter} />
      <ReservationReminder />
    </div>
  );
}
