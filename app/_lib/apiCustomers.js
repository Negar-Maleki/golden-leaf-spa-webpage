import { prisma } from "./prisma";

export async function getCustomers() {
  const customers = await prisma.customer.findMany({
    orderBy: { id: "asc" },
  });

  return customers;
}

export async function getCustomer(email) {
  const customer = await prisma.customer.findUnique({
    where: { email },
  });
  console.log("getCustomer result:", customer);
  return customer;
}
