import { Router } from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../supabase.js';

export const leadsRouter = Router();

const leadSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(255).nullable().optional(),
  whatsapp: z.string().trim().min(1).max(20),
  problem: z.string().trim().min(1).max(4000),
  country_code: z.string().trim().max(2).nullable().optional(),
  ddi: z.string().trim().max(5).nullable().optional(),
}).passthrough();

leadsRouter.post('/submit-lead', async (req, res, next) => {
  try {
    const parsed = leadSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'invalid body', details: parsed.error.flatten() });
    }
    const { error } = await supabaseAdmin.from('leads').insert(parsed.data);
    if (error) throw error;
    res.status(201).json({ ok: true });
  } catch (e) { next(e); }
});
