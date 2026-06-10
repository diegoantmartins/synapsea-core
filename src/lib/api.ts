const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") ?? "";

type ApiOptions = RequestInit & { token?: string | null };

export async function api<T = unknown>(path: string, opts: ApiOptions = {}): Promise<T> {
  const { token, headers, ...rest } = opts;
  const h = new Headers(headers);
  if (!h.has("Content-Type") && rest.body) h.set("Content-Type", "application/json");
  if (token) h.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${BASE}${path}`, { ...rest, headers: h });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const message = (isJson && (payload as { error?: string })?.error) || `HTTP ${res.status}`;
    throw new Error(message);
  }
  return payload as T;
}
