import { Router } from 'express';
import { z } from 'zod';
import { env } from '../env.js';
import { supabaseAdmin } from '../supabase.js';
import { requireUser } from '../middleware/auth.js';
import { fetchInstanceStatus } from '../uazapi.js';

export const meRouter = Router();

meRouter.use(requireUser);

meRouter.get('/', async (req, res) => {
  res.json({ id: req.user!.id, email: req.user!.email, enterpriseId: req.user!.enterpriseId });
});

// List whatsapp numbers available to the logged-in user's enterprise.
// Never returns the uazapi_token.
meRouter.get('/numbers', async (req, res, next) => {
  try {
    const enterpriseId = req.user!.enterpriseId;
    if (!enterpriseId) return res.json({ data: [] });

    const { data, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .select('id, name, number')
      .eq('enterprise_id', enterpriseId)
      .order('name');
    if (error) throw error;
    res.json({ data });
  } catch (e) { next(e); }
});

// Bulk live status for all numbers in the user's enterprise.
// Never returns uazapi_token — just public status fields.
meRouter.get('/numbers/statuses', async (req, res, next) => {
  try {
    const enterpriseId = req.user!.enterpriseId;
    if (!enterpriseId) return res.json({ data: [] });

    const { data: rows, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .select('id, name, number, uazapi_token')
      .eq('enterprise_id', enterpriseId);
    if (error) throw error;

    const results = await Promise.all(
      (rows ?? []).map(async (r) => {
        const base = { id: r.id, name: r.name, number: r.number };
        try {
          const s = await fetchInstanceStatus(r.uazapi_token);
          return {
            ...base,
            status: s.status,
            connected: s.connected,
            loggedIn: s.loggedIn,
            profileName: s.profileName,
            profilePicUrl: s.profilePicUrl,
            lastDisconnect: s.lastDisconnect,
            lastDisconnectReason: s.lastDisconnectReason,
            error: null,
          };
        } catch (e) {
          return {
            ...base,
            status: 'unknown',
            connected: false,
            loggedIn: false,
            profileName: null,
            profilePicUrl: null,
            lastDisconnect: null,
            lastDisconnectReason: null,
            error: e instanceof Error ? e.message : 'uazapi error',
          };
        }
      })
    );
    res.json({ data: results });
  } catch (e) { next(e); }
});

// Generate / refresh QR for a selected number.
const connectSchema = z.object({ number_id: z.string().uuid() });

meRouter.post('/connect-whatsapp', async (req, res, next) => {
  try {
    const parsed = connectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });

    const enterpriseId = req.user!.enterpriseId;
    if (!enterpriseId) return res.status(403).json({ error: 'no enterprise' });

    const { data: row, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .select('id, enterprise_id, uazapi_token, name, number')
      .eq('id', parsed.data.number_id)
      .maybeSingle();
    if (error) throw error;
    if (!row) return res.status(404).json({ error: 'number not found' });
    if (row.enterprise_id !== enterpriseId) return res.status(403).json({ error: 'forbidden' });

    const uazapiRes = await fetch(`${env.UAZAPI_BASE_URL}/instance/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: row.uazapi_token },
      body: JSON.stringify({}),
    });

    if (!uazapiRes.ok) {
      const text = await uazapiRes.text();
      console.error('[uazapi] non-ok response', uazapiRes.status, text);
      return res.status(502).json({ error: 'uazapi error', status: uazapiRes.status });
    }

    const payload = (await uazapiRes.json()) as {
      connected?: string;
      instance?: { qrcode?: string };
    };

    if (payload.connected === 'open') {
      return res.json({ connected: true, name: row.name, number: row.number });
    }

    const raw = payload.instance?.qrcode ?? '';
    const base64 = raw.replace(/^data:image\/png;base64,/, '');
    if (!base64) return res.status(502).json({ error: 'no qr returned' });

    res.json({ connected: false, qrcode: base64, name: row.name, number: row.number });
  } catch (e) { next(e); }
});
