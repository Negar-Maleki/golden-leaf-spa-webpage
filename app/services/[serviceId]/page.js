import Reservation from "@/app/_components/Reservation";
import Service from "@/app/_components/Service";
import Spinner from "@/app/_components/Spinner";
import { getServiceById, getServices } from "@/lib/services";

import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { name } = await getServiceById(Number(params.serviceId));

  return { title: `${name}` };
}

export async function generateStaticParams() {
  const services = await getServices();

  const ids = services.map((service) => ({
    serviceId: String(service.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  const service = await getServiceById(Number(params.serviceId));

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Service service={service} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-500">
          Reserve {service.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation service={service} />
        </Suspense>
      </div>
    </div>
  );
}
