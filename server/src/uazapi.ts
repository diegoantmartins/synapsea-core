import { env } from './env.js';

export type UazapiStatus = {
  /** "connected" | "connecting" | "disconnected" — normalised */
  status: string;
  connected: boolean;
  loggedIn: boolean;
  profileName: string | null;
  profilePicUrl: string | null;
  jid: string | null;
  lastDisconnect: string | null;
  lastDisconnectReason: string | null;
};

/**
 * GET /instance/status on UAZAPI. Does not trigger a reconnect.
 * Throws if UAZAPI is unreachable or returns a non-2xx.
 */
export async function fetchInstanceStatus(token: string): Promise<UazapiStatus> {
  const res = await fetch(`${env.UAZAPI_BASE_URL}/instance/status`, {
    method: 'GET',
    headers: { token },
  });
  if (!res.ok) {
    throw new Error(`uazapi status ${res.status}`);
  }
  const raw = (await res.json()) as {
    instance?: {
      status?: string;
      profileName?: string | null;
      profilePicUrl?: string | null;
      lastDisconnect?: string | null;
      lastDisconnectReason?: string | null;
    };
    status?: {
      connected?: boolean;
      loggedIn?: boolean;
      jid?: { user?: string; server?: string } | null;
    };
  };

  const inst = raw.instance ?? {};
  const st = raw.status ?? {};
  const jid = st.jid && st.jid.user && st.jid.server ? `${st.jid.user}@${st.jid.server}` : null;

  return {
    status: inst.status ?? (st.connected ? 'connected' : 'disconnected'),
    connected: Boolean(st.connected),
    loggedIn: Boolean(st.loggedIn),
    profileName: inst.profileName ?? null,
    profilePicUrl: inst.profilePicUrl ?? null,
    jid,
    lastDisconnect: inst.lastDisconnect ?? null,
    lastDisconnectReason: inst.lastDisconnectReason ?? null,
  };
}
