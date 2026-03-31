import { getServices } from "@/app/_lib/services";

export async function GET() {
  const services = await getServices();
  return Response.json(services);
}
