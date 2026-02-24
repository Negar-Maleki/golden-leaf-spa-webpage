export async function signupApi({ name, email, password, role, avatar }) {
  const response = await fetch("http://localhost:5000/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role, avatar }),
    credentials: "include",
  });

  const text = await response.text();

  const data = (() => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return { message: text };
    }
  })();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }
  return data;
}

export async function loginApi({ email, password }) {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include", // Important: sends cookies
  });

  // Attempt JSON parse; fall back to text for non-JSON errors
  const text = await response.text();
  const data = (() => {
    try {
      return JSON.parse(text);
    } catch (err) {
      return { message: text };
    }
  })();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getCurrentUser() {
  const response = await fetch("http://localhost:5000/api/login/user", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  const data = await response.json();

  return data;
}

export async function logoutApi() {
  const response = await fetch("http://localhost:5000/api/login/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return true;
}

export async function updateCurrentUserApi({
  name,
  avatar,
  newPassword,
}) {
  // Support both FormData (for file uploads) and JSON (for text-only updates)
  let body;
  let headers = {};

  if (avatar instanceof File) {
    // Use FormData for file upload
    const formData = new FormData();
    if (name !== undefined && name !== null) formData.append("name", name);
    formData.append("avatar", avatar);
    if (newPassword) formData.append("newPassword", newPassword);
    body = formData;
    // Don't set Content-Type - browser will set it with boundary
  } else {
    // Use JSON for text-only updates
    const updateData = {};
    if (name !== undefined && name !== null && name !== "") updateData.name = name;
    if (avatar !== undefined && avatar !== null) updateData.avatar = avatar; // URL string
    if (newPassword) updateData.newPassword = newPassword;

    if (Object.keys(updateData).length === 0) {
      throw new Error("No data provided for update");
    }

    body = JSON.stringify(updateData);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch("http://localhost:5000/api/login/user", {
    method: "PUT",
    headers,
    body,
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to update user data" }));
    throw new Error(error.message || "Failed to update user data");
  }

  const data = await response.json();
  return data;
}
