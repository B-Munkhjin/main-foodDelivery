export const signIn = async (credentials: any) => {
  const API_BASE = "https://main-fooddelivery.onrender.com";
  const response = await fetch(`${API_BASE}/api/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const errorText = await response.text();
    console.error("Серверээс JSON биш хариу ирлээ:", errorText);
    throw new Error("Сервертэй холбогдоход алдаа гарлаа (Invalid JSON)");
  }

  if (!response.ok) {
    if (response.status === 404)
      throw new Error("The login endpoint was not found (404).");
    throw new Error(`Server error: ${response.status}`);
  }
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Алдаа гарлаа");
  }

  return data;
};
