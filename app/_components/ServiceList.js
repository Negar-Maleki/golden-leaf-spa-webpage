import ServiceCard from "../_components/ServiceCard";
import { getServices } from "@/lib/services";

async function ServiceList() {
  const services = await getServices();

  if (!services.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {services.map((service) => (
        <ServiceCard service={service} key={service.id} />
      ))}
    </div>
  );
}

export default ServiceList;
