import { Router } from 'express';
import { z } from 'zod';
import { env } from '../env.js';
import { supabaseAdmin } from '../supabase.js';
import { requireAdmin, signAdminToken } from '../middleware/auth.js';
import { fetchInstanceStatus } from '../uazapi.js';

export const adminRouter = Router();

// --- Admin login ---------------------------------------------------------
const loginSchema = z.object({ password: z.string().min(1) });

adminRouter.post('/login', (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'invalid body' });
  if (parsed.data.password !== env.SYNAPSEA_ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  const token = signAdminToken();
  res.json({ token });
});

adminRouter.get('/me', requireAdmin, (_req, res) => {
  res.json({ role: 'admin' });
});

// --- Enterprises ---------------------------------------------------------
const enterpriseSchema = z.object({ name: z.string().trim().min(1).max(255) });

adminRouter.get('/enterprises', requireAdmin, async (_req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('enterprises')
      .select('id, name, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (e) { next(e); }
});

adminRouter.post('/enterprises', requireAdmin, async (req, res, next) => {
  try {
    const parsed = enterpriseSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });
    const { data, error } = await supabaseAdmin
      .from('enterprises')
      .insert({ name: parsed.data.name })
      .select('id, name, created_at')
      .single();
    if (error) throw error;
    res.status(201).json({ data });
  } catch (e) { next(e); }
});

adminRouter.patch('/enterprises/:id', requireAdmin, async (req, res, next) => {
  try {
    const parsed = enterpriseSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });
    const { data, error } = await supabaseAdmin
      .from('enterprises')
      .update({ name: parsed.data.name, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select('id, name, created_at')
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (e) { next(e); }
});

adminRouter.delete('/enterprises/:id', requireAdmin, async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin.from('enterprises').delete().eq('id', req.params.id);
    if (error) throw error;
    res.status(204).end();
  } catch (e) { next(e); }
});

// --- WhatsApp numbers ----------------------------------------------------
const numberSchema = z.object({
  enterprise_id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  number: z.string().trim().min(1).max(32),
  uazapi_token: z.string().trim().min(1),
});

adminRouter.get('/whatsapp-numbers', requireAdmin, async (_req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .select('id, enterprise_id, name, number, created_at, enterprises(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ data });
  } catch (e) { next(e); }
});

adminRouter.post('/whatsapp-numbers', requireAdmin, async (req, res, next) => {
  try {
    const parsed = numberSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });
    const { data, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .insert(parsed.data)
      .select('id, enterprise_id, name, number, created_at')
      .single();
    if (error) throw error;
    res.status(201).json({ data });
  } catch (e) { next(e); }
});

const numberUpdateSchema = z.object({
  enterprise_id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(255).optional(),
  number: z.string().trim().min(1).max(32).optional(),
  uazapi_token: z.string().trim().min(1).optional(),
}).refine((v) => Object.values(v).some((x) => x !== undefined), { message: 'empty update' });

adminRouter.patch('/whatsapp-numbers/:id', requireAdmin, async (req, res, next) => {
  try {
    const parsed = numberUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });
    const { data, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select('id, enterprise_id, name, number, created_at')
      .single();
    if (error) throw error;
    res.json({ data });
  } catch (e) { next(e); }
});

adminRouter.delete('/whatsapp-numbers/:id', requireAdmin, async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin.from('whatsapp_numbers').delete().eq('id', req.params.id);
    if (error) throw error;
    res.status(204).end();
  } catch (e) { next(e); }
});

/**
 * Bulk status for all numbers. One row per number with either status fields
 * or an `error` string if the UAZAPI call failed. Fetches run in parallel.
 */
adminRouter.get('/whatsapp-numbers/statuses', requireAdmin, async (_req, res, next) => {
  try {
    const { data: rows, error } = await supabaseAdmin
      .from('whatsapp_numbers')
      .select('id, uazapi_token');
    if (error) throw error;

    const results = await Promise.all(
      (rows ?? []).map(async (r) => {
        try {
          const s = await fetchInstanceStatus(r.uazapi_token);
          return { id: r.id, ...s, error: null };
        } catch (e) {
          return {
            id: r.id,
            status: 'unknown',
            connected: false,
            loggedIn: false,
            profileName: null,
            profilePicUrl: null,
            jid: null,
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

// --- Users (Supabase Auth + profile) -------------------------------------
const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  full_name: z.string().trim().max(255).optional(),
  enterprise_id: z.string().uuid(),
});

adminRouter.get('/users', requireAdmin, async (_req, res, next) => {
  try {
    const { data: profiles, error } = await supabaseAdmin
      .from('profiles')
      .select('id, full_name, enterprise_id, enterprises(name)')
      .order('created_at', { ascending: false });
    if (error) throw error;

    // Enrich with email from auth.users
    const ids = (profiles ?? []).map(p => p.id);
    const emails: Record<string, string> = {};
    if (ids.length) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
      for (const u of list?.users ?? []) emails[u.id] = u.email ?? '';
    }
    const enriched = (profiles ?? []).map(p => ({ ...p, email: emails[p.id] ?? null }));
    res.json({ data: enriched });
  } catch (e) { next(e); }
});

adminRouter.post('/users', requireAdmin, async (req, res, next) => {
  try {
    const parsed = userSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });

    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: parsed.data.email,
      password: parsed.data.password,
      email_confirm: true,
    });
    if (createErr || !created.user) return res.status(400).json({ error: createErr?.message ?? 'user create failed' });

    const { error: profileErr } = await supabaseAdmin.from('profiles').insert({
      id: created.user.id,
      enterprise_id: parsed.data.enterprise_id,
      full_name: parsed.data.full_name ?? null,
    });
    if (profileErr) {
      await supabaseAdmin.auth.admin.deleteUser(created.user.id);
      return res.status(400).json({ error: profileErr.message });
    }

    res.status(201).json({ data: { id: created.user.id, email: created.user.email } });
  } catch (e) { next(e); }
});

const userUpdateSchema = z.object({
  enterprise_id: z.string().uuid().optional(),
  full_name: z.string().trim().max(255).nullable().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
}).refine((v) => Object.values(v).some((x) => x !== undefined), { message: 'empty update' });

adminRouter.patch('/users/:id', requireAdmin, async (req, res, next) => {
  try {
    const parsed = userUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid body' });

    // Supabase Auth updates (email / password) go through the admin API
    const authPatch: { email?: string; password?: string } = {};
    if (parsed.data.email) authPatch.email = parsed.data.email;
    if (parsed.data.password) authPatch.password = parsed.data.password;
    if (Object.keys(authPatch).length) {
      const { error: authErr } = await supabaseAdmin.auth.admin.updateUserById(req.params.id, authPatch);
      if (authErr) return res.status(400).json({ error: authErr.message });
    }

    // Profile updates
    const profilePatch: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (parsed.data.enterprise_id !== undefined) profilePatch.enterprise_id = parsed.data.enterprise_id;
    if (parsed.data.full_name !== undefined) profilePatch.full_name = parsed.data.full_name;
    if (Object.keys(profilePatch).length > 1) {
      const { error: profileErr } = await supabaseAdmin
        .from('profiles')
        .update(profilePatch)
        .eq('id', req.params.id);
      if (profileErr) throw profileErr;
    }

    res.json({ ok: true });
  } catch (e) { next(e); }
});

adminRouter.delete('/users/:id', requireAdmin, async (req, res, next) => {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(req.params.id);
    if (error) throw error;
    res.status(204).end();
  } catch (e) { next(e); }
});
