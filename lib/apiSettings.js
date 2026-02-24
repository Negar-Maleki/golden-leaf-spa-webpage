export async function getSettings() {
  const res = await fetch("http://localhost:5000/api/settings", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch settings");
  }
  const data = await res.json();

  return data;
}

export async function updateSetting(newSetting) {
  const res = await fetch(`http://localhost:5000/api/settings`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSetting),
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to update setting");
  }
  const data = await res.json();
  return data;
}
