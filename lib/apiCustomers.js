export async function getCustomers() {
  const res = await fetch("http://localhost:5000/api/customers", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }
  return res.json();
}
