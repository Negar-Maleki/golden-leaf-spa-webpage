import { getServices } from "@/lib/services";
import ServiceCard from "../_components/ServiceCard";

export default async function Page() {
  const services = await getServices();

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
      {services.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service) => (
            <ServiceCard service={service} key={service.id} />
          ))}
        </div>
      )}
    </div>
  );
}
