const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");

    (error as any).status = res.status;

    throw error;
  }

  return data;
}
