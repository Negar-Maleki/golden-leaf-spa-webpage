// import { unstable_noStore } from "next/cache";
import ServiceCard from "../_components/ServiceCard";
import { getServices } from "@/lib/services";

async function ServiceList({ filter }) {
  // unstable_noStore();
  const services = await getServices();

  if (!services.length) return null;

  let displayServices;

  if (filter === "all") displayServices = services;
  if (filter === "short")
    displayServices = services.filter((service) => service.duration <= 60);
  if (filter === "medium")
    displayServices = services.filter(
      (service) => service.duration < 120 && service.duration > 60,
    );
  if (filter === "long")
    displayServices = services.filter((service) => service.duration >= 120);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {displayServices.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </div>
  );
}

export default ServiceList;
