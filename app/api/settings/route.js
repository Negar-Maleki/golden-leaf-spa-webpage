import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.settings.findMany({
    orderBy: { id: "asc" },
  });
  return Response.json(settings);
}
