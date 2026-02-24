export async function getServices() {
  const services = await prisma.service.findMany({
    orderBy: { id: "asc" },
  });

  return services;
}
// export async function getServices() {

//   const res = await fetch("http://localhost:5000/api/services", {
//     credentials: "include",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to fetch services");
//   }
//   const data = await res.json();
//   return data;
// }

// export async function createEditService(serviceData, id) {
//   let res;
//   if (!id) {
//     res = await fetch("http://localhost:5000/api/services", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(serviceData),
//       credentials: "include",
//     });
//   } else {
//     res = await fetch(`http://localhost:5000/api/services/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(serviceData),
//       credentials: "include",
//     });
//   }
//   if (!res.ok) {
//     throw new Error("Failed to create service");
//   }
//   return res.json();
// }

// export async function deleteService(serviceId) {
//   const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
//     method: "DELETE",
//     credentials: "include",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to delete service");
//   }
// }
