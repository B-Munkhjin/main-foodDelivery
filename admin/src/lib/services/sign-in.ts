export const signIn = async (credentials: any) => {
  const response = await fetch("/api/auth", {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Алдаа гарлаа");
  }

  return data;
};
