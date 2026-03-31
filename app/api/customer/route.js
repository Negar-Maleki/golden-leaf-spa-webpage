import { getCustomers } from "@/app/_lib/apiCustomers";

export async function GET() {
  const customer = await getCustomers();
  return Response.json(customer);
}
