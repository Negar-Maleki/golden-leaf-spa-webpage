import { prisma } from "@/lib/prisma";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { id: "asc" },
  });
  return Response.json(services);
}
