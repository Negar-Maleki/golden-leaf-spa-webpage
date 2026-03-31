import { getServices } from "@/app/_lib/services";

export async function GET() {
  const settings = await getServices();
  return Response.json(settings);
}
